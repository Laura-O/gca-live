import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Competition } from '$lib/types/competition';

const WCA_BASE_URL =
	'https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const REQUEST_TIMEOUT_MS = 5000;

type CacheEntry<T> = {
	data: T;
	expiresAt: number;
};

const cache = new Map<string, CacheEntry<Competition>>();

function fromCache(key: string): Competition | undefined {
	const hit = cache.get(key);
	if (!hit) return undefined;
	if (Date.now() > hit.expiresAt) {
		cache.delete(key);
		return undefined;
	}
	return hit.data;
}

function saveCache(key: string, data: Competition) {
	cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

async function fetchWithTimeout(resource: string, timeoutMs: number) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	try {
		return await fetch(resource, { signal: controller.signal });
	} finally {
		clearTimeout(timeout);
	}
}

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	if (!id) {
		return json({ message: 'Competition id is required.' }, { status: 400 });
	}

	const cacheKey = id.toLowerCase();
	const cached = fromCache(cacheKey);
	if (cached) {
		return json(cached);
	}

	try {
		const response = await fetchWithTimeout(
			`${WCA_BASE_URL}/${id}.json`,
			REQUEST_TIMEOUT_MS
		);

		if (!response.ok) {
			return json(
				{ message: `Unable to load competition ${id}.` },
				{ status: response.status }
			);
		}

		const competition = (await response.json()) as Competition;
		saveCache(cacheKey, competition);
		return json(competition);
	} catch (err) {
		const status =
			err instanceof DOMException && err.name === 'AbortError' ? 504 : 500;
		return json(
			{ message: 'Failed to load competition. Please try again later.' },
			{ status }
		);
	}
};
