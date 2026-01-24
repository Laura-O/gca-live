import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_CONFIG } from '$lib/config';
import { getCompetitions } from '$lib/server/competitions';

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
		const competitions = await getCompetitions(region, days);

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
