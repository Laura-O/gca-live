import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCompetitionById } from '$lib/server/competitions';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	if (!id) {
		return json({ message: 'Competition id is required.' }, { status: 400 });
	}

	try {
		const competition = await getCompetitionById(id);

		if (!competition) {
			return json({ message: `Competition ${id} not found.` }, { status: 404 });
		}

		return json(competition);
	} catch (err) {
		console.error('Database error:', err);
		return json(
			{ message: 'Failed to load competition. Please try again later.' },
			{ status: 500 }
		);
	}
};
