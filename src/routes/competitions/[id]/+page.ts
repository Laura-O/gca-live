import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { id } = params;
	const response = await fetch(
		`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/${id}.json`
	);

	if (!response.ok) {
		throw new Error(`Could not fetch competition with id ${id}`);
	}

	const competition = await response.json();

	return {
		competition
	};
};
