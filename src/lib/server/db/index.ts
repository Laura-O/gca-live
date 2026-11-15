import { neon } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { DATABASE_URL } from '$app/env/private';

let _db: NeonHttpDatabase<typeof schema> | null = null;

export function getDb() {
	if (!_db) {
		if (!DATABASE_URL) {
			throw new Error('DATABASE_URL environment variable is not set');
		}
		const sql = neon(DATABASE_URL);
		_db = drizzle(sql, { schema });
	}
	return _db;
}
