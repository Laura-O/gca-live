import { neon } from '@neondatabase/serverless';
import { execSync } from 'child_process';
import { readFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const WCA_EXPORT_URL = 'https://www.worldcubeassociation.org/export/results';
const BATCH_SIZE = 500;

function log(message: string) {
	console.log(`[${new Date().toISOString()}] ${message}`);
}

async function getExportInfo(): Promise<{
	zipUrl: string;
	exportDate: string;
}> {
	log('Fetching WCA export page...');
	const response = await fetch(WCA_EXPORT_URL);
	if (!response.ok) {
		throw new Error(`Failed to fetch export page: ${response.status}`);
	}
	const html = await response.text();

	// Find the TSV zip download link
	// URL pattern: https://assets.worldcubeassociation.org/export/results/WCA_export_v2_048_20250217T000009Z.tsv.zip
	const tsvMatch = html.match(/href="([^"]*WCA_export[^"]*\.tsv\.zip)"/);
	if (!tsvMatch) {
		throw new Error(
			'Could not find TSV export download link on WCA export page'
		);
	}
	let zipUrl = tsvMatch[1];
	// Make URL absolute if relative
	if (zipUrl.startsWith('/')) {
		zipUrl = `https://www.worldcubeassociation.org${zipUrl}`;
	}

	// Extract date from the URL (e.g., WCA_export_v2_048_20250217T000009Z.tsv.zip)
	const dateMatch = zipUrl.match(/(\d{8})T/);
	if (!dateMatch) {
		throw new Error('Could not extract export date from URL');
	}
	const exportDate = dateMatch[1];

	log(`Found export: ${exportDate}, URL: ${zipUrl}`);
	return { zipUrl, exportDate };
}

async function checkAlreadyImported(
	sql: ReturnType<typeof neon>,
	exportDate: string
): Promise<boolean> {
	// Create import log table if it doesn't exist
	await sql`
		CREATE TABLE IF NOT EXISTS wca_import_log (
			id SERIAL PRIMARY KEY,
			imported_at TIMESTAMP DEFAULT NOW(),
			export_date TEXT NOT NULL,
			competitions_count INTEGER NOT NULL
		)
	`;

	const result = await sql`
		SELECT id FROM wca_import_log WHERE export_date = ${exportDate} LIMIT 1
	`;
	return result.length > 0;
}

function downloadAndExtract(zipUrl: string): string {
	const tmpDir = join(process.cwd(), 'tmp-wca-export');

	if (existsSync(tmpDir)) {
		rmSync(tmpDir, { recursive: true });
	}
	mkdirSync(tmpDir, { recursive: true });

	const zipPath = join(tmpDir, 'export.zip');

	log('Downloading export...');
	execSync(`curl -L -o "${zipPath}" "${zipUrl}"`, { stdio: 'inherit' });

	log('Extracting...');
	execSync(`unzip -o "${zipPath}" -d "${tmpDir}"`, { stdio: 'inherit' });

	// Find the competitions TSV file
	const files = readdirSync(tmpDir);
	const competitionsFile = files.find(
		(f) => f.toLowerCase().includes('competitions') && f.endsWith('.tsv')
	);
	if (!competitionsFile) {
		throw new Error(
			`Could not find Competitions TSV file. Files found: ${files.join(', ')}`
		);
	}

	return join(tmpDir, competitionsFile);
}

interface CompetitionRow {
	id: string;
	name: string;
	city: string | null;
	countryId: string;
	venue: string | null;
	venueAddress: string | null;
	startDate: string;
	endDate: string;
	latitudeMicrodegrees: number | null;
	longitudeMicrodegrees: number | null;
}

function parseCompetitionsTsv(filePath: string): CompetitionRow[] {
	log('Parsing competitions TSV...');
	const content = readFileSync(filePath, 'utf-8');
	const lines = content.split('\n');

	if (lines.length < 2) {
		throw new Error('Competitions TSV file is empty or has no data rows');
	}

	// Parse header to find column indices dynamically
	const headers = lines[0].split('\t');
	const colIndex = (name: string): number => {
		const idx = headers.indexOf(name);
		if (idx === -1) {
			throw new Error(
				`Column "${name}" not found in TSV headers: ${headers.join(', ')}`
			);
		}
		return idx;
	};

	const idIdx = colIndex('id');
	const nameIdx = colIndex('name');
	const cityIdx = colIndex('city_name');
	const countryIdx = colIndex('country_id');
	const venueIdx = colIndex('venue');
	const addressIdx = colIndex('venue_address');
	const yearIdx = colIndex('year');
	const monthIdx = colIndex('month');
	const dayIdx = colIndex('day');
	const endYearIdx = colIndex('end_year');
	const endMonthIdx = colIndex('end_month');
	const endDayIdx = colIndex('end_day');
	const latIdx = colIndex('latitude_microdegrees');
	const lngIdx = colIndex('longitude_microdegrees');

	const competitions: CompetitionRow[] = [];

	for (let i = 1; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line) continue;

		const cols = line.split('\t');

		const year = cols[yearIdx];
		const month = cols[monthIdx].padStart(2, '0');
		const day = cols[dayIdx].padStart(2, '0');
		const endYear = cols[endYearIdx];
		const endMonth = cols[endMonthIdx].padStart(2, '0');
		const endDay = cols[endDayIdx].padStart(2, '0');

		const lat = cols[latIdx] ? parseInt(cols[latIdx], 10) : null;
		const lng = cols[lngIdx] ? parseInt(cols[lngIdx], 10) : null;

		competitions.push({
			id: cols[idIdx],
			name: cols[nameIdx],
			city: cols[cityIdx] || null,
			countryId: cols[countryIdx],
			venue: cols[venueIdx] || null,
			venueAddress: cols[addressIdx] || null,
			startDate: `${year}-${month}-${day}`,
			endDate: `${endYear}-${endMonth}-${endDay}`,
			latitudeMicrodegrees: isNaN(lat!) ? null : lat,
			longitudeMicrodegrees: isNaN(lng!) ? null : lng
		});
	}

	log(`Parsed ${competitions.length} competitions`);
	return competitions;
}

async function batchUpsert(
	sql: ReturnType<typeof neon>,
	competitions: CompetitionRow[]
) {
	log(
		`Upserting ${competitions.length} competitions in batches of ${BATCH_SIZE}...`
	);

	let inserted = 0;

	for (let i = 0; i < competitions.length; i += BATCH_SIZE) {
		const batch = competitions.slice(i, i + BATCH_SIZE);

		// Build a parameterized VALUES clause
		const values: unknown[] = [];
		const placeholders: string[] = [];

		for (const comp of batch) {
			const offset = values.length;
			placeholders.push(
				`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9}, $${offset + 10})`
			);
			values.push(
				comp.id,
				comp.name,
				comp.city,
				comp.countryId,
				comp.venue,
				comp.venueAddress,
				comp.startDate,
				comp.endDate,
				comp.latitudeMicrodegrees,
				comp.longitudeMicrodegrees
			);
		}

		const query = `
			INSERT INTO wca_competitions (id, name, city, country_id, venue, venue_address, start_date, end_date, latitude_microdegrees, longitude_microdegrees)
			VALUES ${placeholders.join(', ')}
			ON CONFLICT (id) DO UPDATE SET
				name = EXCLUDED.name,
				city = EXCLUDED.city,
				country_id = EXCLUDED.country_id,
				venue = EXCLUDED.venue,
				venue_address = EXCLUDED.venue_address,
				start_date = EXCLUDED.start_date,
				end_date = EXCLUDED.end_date,
				latitude_microdegrees = EXCLUDED.latitude_microdegrees,
				longitude_microdegrees = EXCLUDED.longitude_microdegrees
		`;

		await sql.query(query, values);
		inserted += batch.length;

		if (inserted % 5000 === 0 || inserted === competitions.length) {
			log(`  Progress: ${inserted}/${competitions.length}`);
		}
	}

	log(`Upserted ${inserted} competitions`);
	return inserted;
}

function cleanup() {
	const tmpDir = join(process.cwd(), 'tmp-wca-export');
	if (existsSync(tmpDir)) {
		rmSync(tmpDir, { recursive: true });
		log('Cleaned up temp files');
	}
}

async function main() {
	const force = process.argv.includes('--force');

	if (!process.env.DATABASE_URL) {
		console.error('DATABASE_URL environment variable is required');
		process.exit(1);
	}

	const sql = neon(process.env.DATABASE_URL);

	try {
		// 1. Get export info
		const { zipUrl, exportDate } = await getExportInfo();

		// 2. Check if already imported
		if (!force) {
			const alreadyImported = await checkAlreadyImported(sql, exportDate);
			if (alreadyImported) {
				log(`Export ${exportDate} already imported. Use --force to re-import.`);
				return;
			}
		} else {
			// Still ensure the log table exists
			await checkAlreadyImported(sql, exportDate);
			log('Force mode enabled, proceeding with import...');
		}

		// 3. Download & extract
		const tsvPath = downloadAndExtract(zipUrl);

		// 4. Parse competitions
		const competitions = parseCompetitionsTsv(tsvPath);

		// 5. Batch upsert
		const count = await batchUpsert(sql, competitions);

		// 6. Log import
		await sql`
			INSERT INTO wca_import_log (export_date, competitions_count)
			VALUES (${exportDate}, ${count})
		`;
		log(
			`Import complete. Logged export date ${exportDate} with ${count} competitions.`
		);
	} finally {
		// 7. Cleanup
		cleanup();
	}
}

main().catch((err) => {
	console.error('Import failed:', err);
	cleanup();
	process.exit(1);
});
