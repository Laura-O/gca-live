import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Competition } from '$lib/types/competition';
import { getDb } from '$lib/server/db';
import { wcaCompetitions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	if (!id) {
		return json({ message: 'Competition id is required.' }, { status: 400 });
	}

	try {
		const results = await getDb()
			.select()
			.from(wcaCompetitions)
			.where(eq(wcaCompetitions.id, id))
			.limit(1);

		if (results.length === 0) {
			return json({ message: `Competition ${id} not found.` }, { status: 404 });
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

		return json(competition);
	} catch (err) {
		console.error('Database error:', err);
		return json(
			{ message: 'Failed to load competition. Please try again later.' },
			{ status: 500 }
		);
	}
};
