import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCompetitionById } from '$lib/server/competitions';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	try {
		const competition = await getCompetitionById(id);

		if (!competition) {
			throw error(404, `Competition ${id} not found`);
		}

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
