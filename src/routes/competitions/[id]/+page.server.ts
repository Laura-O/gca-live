import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Competition } from '$lib/types/competition';
import { db } from '$lib/server/db';
import { wcaCompetitions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	try {
		const results = await db
			.select()
			.from(wcaCompetitions)
			.where(eq(wcaCompetitions.id, id))
			.limit(1);

		if (results.length === 0) {
			throw error(404, `Competition ${id} not found`);
		}

		const row = results[0];
		const competition: Competition = {
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

		return {
			competition
		};
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Database error:', err);
		throw error(500, 'Failed to load competition');
	}
};
