import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { getCacheStats, clearCache } from '$lib/server/cache';

function isAuthorized(request: Request): boolean {
	const secret = env.CACHE_API_KEY;
	if (!secret) {
		// No key configured = endpoint disabled in production
		return false;
	}

	const authHeader = request.headers.get('Authorization');
	const keyFromHeader = authHeader?.replace('Bearer ', '');
	const keyFromQuery = new URL(request.url).searchParams.get('key');

	return keyFromHeader === secret || keyFromQuery === secret;
}

export const GET: RequestHandler = async ({ request }) => {
	if (!isAuthorized(request)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const stats = getCacheStats();

	return json({
		entries: stats.length,
		cache: stats
	});
};

export const DELETE: RequestHandler = async ({ request }) => {
	if (!isAuthorized(request)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	clearCache();

	return json({ message: 'Cache cleared' });
};
