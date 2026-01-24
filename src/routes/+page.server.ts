import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_CONFIG } from '$lib/config';
import { getCompetitions } from '$lib/server/competitions';

const { defaultRegion, defaultDays, maxDays } = API_CONFIG;

export const load: PageServerLoad = async ({ url }) => {
	const daysParam = url.searchParams.get('days');
	const days = daysParam ? parseInt(daysParam, 10) : defaultDays;

	if (isNaN(days) || days < 1 || days > maxDays) {
		throw error(400, 'Invalid "days" parameter. Must be between 1 and 365.');
	}

	try {
		const competitions = await getCompetitions(defaultRegion, days);

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
