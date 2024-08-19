export async function load({ fetch }) {
	const response = await fetch(
		'https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/DE.json'
	);
	const deResponse = await response.json();
	const competitions = deResponse.items;

	const today = new Date();

	const nextWeek = new Date();
	nextWeek.setDate(nextWeek.getDate() + 7);

	const filteredCompetitions = competitions.filter((comp: any) => {
		const startDate = new Date(comp.date.from);
		const endDate = new Date(comp.date.till);
		return startDate <= nextWeek && endDate >= today;
	});

	return {
		competitions: filteredCompetitions
	};
}
