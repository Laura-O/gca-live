import { error } from "@sveltejs/kit";
const load = async ({ fetch, url }) => {
  const daysParam = url.searchParams.get("days");
  const days = daysParam ? parseInt(daysParam, 10) : 7;
  if (isNaN(days) || days < 1 || days > 365) {
    throw error(400, 'Invalid "days" parameter. Must be between 1 and 365.');
  }
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/DE.json"
    );
    if (!response.ok) {
      throw error(response.status, "Failed to fetch competitions data");
    }
    const deResponse = await response.json();
    const competitions = deResponse.items;
    if (!Array.isArray(competitions)) {
      throw error(500, "Invalid response format from WCA API");
    }
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const dynamicDate = /* @__PURE__ */ new Date();
    dynamicDate.setDate(dynamicDate.getDate() + days);
    const filteredCompetitions = competitions.filter((comp) => {
      const startDate = new Date(comp.date.from);
      const endDate = new Date(comp.date.till);
      return startDate <= dynamicDate && endDate >= today;
    }).sort((a, b) => {
      const dateA = new Date(a.date.from);
      const dateB = new Date(b.date.from);
      return dateA.getTime() - dateB.getTime();
    });
    return {
      competitions: filteredCompetitions,
      days
    };
  } catch (err) {
    if (err && typeof err === "object" && "status" in err) {
      throw err;
    }
    throw error(
      500,
      "An unexpected error occurred while fetching competitions"
    );
  }
};
export {
  load
};
