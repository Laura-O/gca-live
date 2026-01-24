import type { Competition } from '$lib/types/competition';
import { getDb } from '$lib/server/db';
import { wcaCompetitions } from '$lib/server/db/schema';
import { eq, gte, lte, and } from 'drizzle-orm';
import { cached } from './cache';

/**
 * Transform a database row to a Competition object.
 */
function toCompetition(row: typeof wcaCompetitions.$inferSelect): Competition {
	return {
		id: row.id,
		name: row.name,
		date: {
			from: row.startDate ?? '',
			till: row.endDate ?? ''
		},
		city: row.city ?? undefined,
		venue: row.venue ?? undefined,
		venueAddress: row.venueAddress ?? undefined,
		latitude: row.latitudeMicrodegrees
			? row.latitudeMicrodegrees / 1_000_000
			: undefined,
		longitude: row.longitudeMicrodegrees
			? row.longitudeMicrodegrees / 1_000_000
			: undefined
	};
}

/**
 * Get competitions for a region within a date range.
 * Results are cached for 1 hour.
 */
export async function getCompetitions(
	region: string,
	days: number
): Promise<Competition[]> {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayStr = today.toISOString().split('T')[0];

	const cutoff = new Date();
	cutoff.setDate(cutoff.getDate() + days);
	const cutoffStr = cutoff.toISOString().split('T')[0];

	const cacheKey = `competitions:${region}:${todayStr}:${days}`;

	return cached(cacheKey, async () => {
		const results = await getDb()
			.select()
			.from(wcaCompetitions)
			.where(
				and(
					eq(wcaCompetitions.countryId, region),
					lte(wcaCompetitions.startDate, cutoffStr),
					gte(wcaCompetitions.endDate, todayStr)
				)
			)
			.orderBy(wcaCompetitions.startDate);

		return results.map(toCompetition);
	});
}

/**
 * Get a single competition by ID.
 * Results are cached for 1 hour.
 */
export async function getCompetitionById(
	id: string
): Promise<Competition | null> {
	const cacheKey = `competition:${id}`;

	return cached(cacheKey, async () => {
		const results = await getDb()
			.select()
			.from(wcaCompetitions)
			.where(eq(wcaCompetitions.id, id))
			.limit(1);

		if (results.length === 0) {
			return null;
		}

		return toCompetition(results[0]);
	});
}
