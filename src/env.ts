import { defineEnvVars } from '@sveltejs/kit/env';

// Both are optional and checked where they're used, so a missing value
// doesn't block startup (or the build's analyse step).
export const variables = defineEnvVars({
	DATABASE_URL: {
		description: 'Neon Postgres connection string',
		schema: (value) => value
	},
	CACHE_API_KEY: {
		description: 'Secret for /api/cache; endpoint is disabled when unset',
		schema: (value) => value
	}
});
