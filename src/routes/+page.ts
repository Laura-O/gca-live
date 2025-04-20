export async function load({ fetch, url }) {
	const days = parseInt(url.searchParams.get('days') || '7', 10); // Default to 7 days if no parameter provided

	const response = await fetch(
		'https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/DE.json'
	);
	const deResponse = await response.json();
	const competitions = deResponse.items;

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const dynamicDate = new Date();
	dynamicDate.setDate(dynamicDate.getDate() + days);

	console.log('today', today);

	const filteredCompetitions = competitions
		.filter((comp: any) => {
			const startDate = new Date(comp.date.from);
			const endDate = new Date(comp.date.till);
			return startDate <= dynamicDate && endDate >= today;
		})
		.sort((a: any, b: any) => {
			const dateA = new Date(a.date.from);
			const dateB = new Date(b.date.from);
			return dateA.getTime() - dateB.getTime();
		});

	return {
		competitions: filteredCompetitions,
		days // Pass days to the page for context
	};
}
