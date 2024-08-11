export async function load({ fetch }) {
    const response = await fetch('https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/DE.json');
    const deResponse = await response.json();
    const competitions = deResponse.items;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const filteredCompetitions = competitions.filter((comp: any) => {
        const compDate = new Date(comp.date.from);
        return compDate >= yesterday && compDate <= nextWeek;
    });

    return {
        competitions: filteredCompetitions
    };
}