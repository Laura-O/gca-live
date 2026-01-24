import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Competition } from '$lib/types/competition';
import { API_CONFIG } from '$lib/config';
import { getDb } from '$lib/server/db';
import { wcaCompetitions } from '$lib/server/db/schema';
import { eq, gte, lte, and } from 'drizzle-orm';

const { defaultRegion, defaultDays, maxDays } = API_CONFIG;

export const load: PageServerLoad = async ({ url }) => {
	const daysParam = url.searchParams.get('days');
	const days = daysParam ? parseInt(daysParam, 10) : defaultDays;

	if (isNaN(days) || days < 1 || days > maxDays) {
		throw error(400, 'Invalid "days" parameter. Must be between 1 and 365.');
	}

	try {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const cutoff = new Date();
		cutoff.setDate(cutoff.getDate() + days);

		const todayStr = today.toISOString().split('T')[0];
		const cutoffStr = cutoff.toISOString().split('T')[0];

		const results = await getDb()
			.select()
			.from(wcaCompetitions)
			.where(
				and(
					eq(wcaCompetitions.countryId, defaultRegion),
					lte(wcaCompetitions.startDate, cutoffStr),
					gte(wcaCompetitions.endDate, todayStr)
				)
			)
			.orderBy(wcaCompetitions.startDate);

		const competitions: Competition[] = results.map((row) => ({
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
		}));

		return {
			competitions,
			days
		};
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Database error:', err);
		throw error(
			500,
			'An unexpected error occurred while fetching competitions'
		);
	}
};
