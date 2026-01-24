import { pgTable, varchar, text, date, integer } from 'drizzle-orm/pg-core';

export const wcaCompetitions = pgTable('wca_competitions', {
	id: varchar('id', { length: 50 }).primaryKey(),
	name: text('name').notNull(),
	city: text('city'),
	countryId: varchar('country_id', { length: 10 }).notNull(),
	venue: text('venue'),
	venueAddress: text('venue_address'),
	startDate: date('start_date'),
	endDate: date('end_date'),
	latitudeMicrodegrees: integer('latitude_microdegrees'),
	longitudeMicrodegrees: integer('longitude_microdegrees')
});

export type WcaCompetition = typeof wcaCompetitions.$inferSelect;
