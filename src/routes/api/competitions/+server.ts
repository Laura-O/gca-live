import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Competition } from '$lib/types/competition';
import { API_CONFIG } from '$lib/config';

const {
	wcaBaseUrl,
	defaultRegion,
	defaultDays,
	maxDays,
	cacheTtl,
	requestTimeout
} = API_CONFIG;

type CacheEntry<T> = {
	data: T;
	expiresAt: number;
};

const cache = new Map<string, CacheEntry<Competition[]>>();

function fromCache(key: string): Competition[] | undefined {
	const hit = cache.get(key);
	if (!hit) return undefined;
	if (Date.now() > hit.expiresAt) {
		cache.delete(key);
		return undefined;
	}
	return hit.data;
}

function saveCache(key: string, data: Competition[]) {
	cache.set(key, { data, expiresAt: Date.now() + cacheTtl });
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

export const GET: RequestHandler = async ({ url }) => {
	const daysParam = url.searchParams.get('days');
	const region = url.searchParams.get('region') ?? defaultRegion;

	const days = daysParam ? Number.parseInt(daysParam, 10) : defaultDays;
	if (Number.isNaN(days) || days < 1 || days > maxDays) {
		return json(
			{
				competitions: [],
				days: defaultDays,
				validationError:
					'Invalid "days" parameter. Please choose a value between 1 and 365.'
			},
			{ status: 400 }
		);
	}

	const cacheKey = `${region}`.toLowerCase();
	let competitions = fromCache(cacheKey);

	if (!competitions) {
		try {
			const response = await fetchWithTimeout(
				`${wcaBaseUrl}/${region}.json`,
				requestTimeout
			);

			if (!response.ok) {
				return json(
					{
						competitions: [],
						days,
						validationError: 'Unable to load competitions at this time.'
					},
					{ status: response.status }
				);
			}

			const payload = (await response.json()) as { items?: Competition[] };
			if (!payload?.items || !Array.isArray(payload.items)) {
				return json(
					{
						competitions: [],
						days,
						validationError: 'Unexpected response format received from source.'
					},
					{ status: 502 }
				);
			}

			competitions = payload.items;
			saveCache(cacheKey, competitions);
		} catch (err) {
			const status =
				err instanceof DOMException && err.name === 'AbortError' ? 504 : 500;
			return json(
				{
					competitions: [],
					days,
					validationError:
						'Failed to retrieve competitions. Please try again later.'
				},
				{ status }
			);
		}
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const cutoff = new Date();
	cutoff.setDate(cutoff.getDate() + days);

	const filtered = competitions
		.filter((comp) => {
			const startDate = new Date(comp.date.from);
			const endDate = new Date(comp.date.till);
			return startDate <= cutoff && endDate >= today;
		})
		.sort(
			(a, b) =>
				new Date(a.date.from).getTime() - new Date(b.date.from).getTime()
		);

	return json({ competitions: filtered, days });
};
