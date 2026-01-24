export interface CompetitionDateRange {
	from: string;
	till: string;
}

export interface Competition {
	id: string;
	name: string;
	date: CompetitionDateRange;
	city?: string;
	venue?: string;
	venueAddress?: string;
	latitude?: number;
	longitude?: number;
}

export interface CompetitionsResponse {
	competitions: Competition[];
	days: number;
	validationError?: string;
}
