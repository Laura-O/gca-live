import {
	pgTable,
	varchar,
	text,
	date,
	integer,
	serial,
	timestamp
} from 'drizzle-orm/pg-core';

export const wcaCompetitions = pgTable('wca_competitions', {
	id: varchar('id', { length: 50 }).primaryKey(),
	name: text('name').notNull(),
	city: text('city'),
	countryId: varchar('country_id', { length: 50 }).notNull(),
	venue: text('venue'),
	venueAddress: text('venue_address'),
	startDate: date('start_date'),
	endDate: date('end_date'),
	latitudeMicrodegrees: integer('latitude_microdegrees'),
	longitudeMicrodegrees: integer('longitude_microdegrees')
});

export type WcaCompetition = typeof wcaCompetitions.$inferSelect;

export const wcaImportLog = pgTable('wca_import_log', {
	id: serial('id').primaryKey(),
	importedAt: timestamp('imported_at').defaultNow(),
	exportDate: text('export_date').notNull(),
	competitionsCount: integer('competitions_count').notNull()
});

export type WcaImportLog = typeof wcaImportLog.$inferSelect;
