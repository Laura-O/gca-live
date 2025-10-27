export interface CompetitionDateRange {
	from: string;
	till: string;
}

export interface Competition {
	id: string;
	name: string;
	date: CompetitionDateRange;
	[key: string]: unknown;
}

export interface CompetitionsResponse {
	competitions: Competition[];
	days: number;
	validationError?: string;
}
