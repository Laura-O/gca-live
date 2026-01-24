import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Competition } from '$lib/types/competition';
import { API_CONFIG } from '$lib/config';
import { getDb } from '$lib/server/db';
import { wcaCompetitions } from '$lib/server/db/schema';
import { eq, gte, lte, and } from 'drizzle-orm';

const { defaultRegion, defaultDays, maxDays } = API_CONFIG;

export const GET: RequestHandler = async ({ url }) => {
	const daysParam = url.searchParams.get('days');
	const region = url.searchParams.get('region') ?? defaultRegion;

	const days = daysParam ? Number.parseInt(daysParam, 10) : defaultDays;
	if (Number.isNaN(days) || days < 1 || days > maxDays) {
		return json(
			{
				competitions: [],
				days: defaultDays,
				validationError:
					'Invalid "days" parameter. Please choose a value between 1 and 365.'
			},
			{ status: 400 }
		);
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
					eq(wcaCompetitions.countryId, region),
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

		return json({ competitions, days });
	} catch (err) {
		console.error('Database error:', err);
		return json(
			{
				competitions: [],
				days,
				validationError:
					'Failed to retrieve competitions. Please try again later.'
			},
			{ status: 500 }
		);
	}
};
