import { describe, it, expect } from 'vitest';
import type {
	Competition,
	CompetitionDateRange,
	CompetitionsResponse
} from './competition';

describe('Competition Types', () => {
	it('should create a valid Competition object', () => {
		const dateRange: CompetitionDateRange = {
			from: '2025-01-01',
			till: '2025-01-02'
		};

		const competition: Competition = {
			id: 'test-comp-2025',
			name: 'Test Competition 2025',
			date: dateRange
		};

		expect(competition.id).toBe('test-comp-2025');
		expect(competition.name).toBe('Test Competition 2025');
		expect(competition.date.from).toBe('2025-01-01');
		expect(competition.date.till).toBe('2025-01-02');
	});

	it('should create a valid CompetitionsResponse object', () => {
		const response: CompetitionsResponse = {
			competitions: [],
			days: 7
		};

		expect(response.competitions).toEqual([]);
		expect(response.days).toBe(7);
		expect(response.validationError).toBeUndefined();
	});

	it('should allow optional properties on Competition', () => {
		const competition: Competition = {
			id: 'test-comp-2025',
			name: 'Test Competition 2025',
			date: {
				from: '2025-01-01',
				till: '2025-01-02'
			},
			city: 'Berlin',
			venue: 'Test Venue',
			venueAddress: '123 Test St',
			latitude: 52.52,
			longitude: 13.405
		};

		expect(competition.city).toBe('Berlin');
		expect(competition.venue).toBe('Test Venue');
		expect(competition.venueAddress).toBe('123 Test St');
		expect(competition.latitude).toBe(52.52);
		expect(competition.longitude).toBe(13.405);
	});
});
