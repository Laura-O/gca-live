/**
 * Simple in-memory cache with TTL support.
 * Suitable for serverless environments where instances may be ephemeral.
 */

interface CacheEntry<T> {
	value: T;
	createdAt: number;
	expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

/**
 * Get a value from cache, or compute and store it if missing/expired.
 */
export async function cached<T>(
	key: string,
	compute: () => Promise<T>,
	ttlMs: number = DEFAULT_TTL_MS
): Promise<T> {
	const now = Date.now();
	const entry = cache.get(key) as CacheEntry<T> | undefined;

	if (entry && entry.expiresAt > now) {
		return entry.value;
	}

	const value = await compute();
	cache.set(key, { value, createdAt: now, expiresAt: now + ttlMs });
	return value;
}

/**
 * Invalidate a specific cache key.
 */
export function invalidateCache(key: string): void {
	cache.delete(key);
}

/**
 * Invalidate all cache entries matching a prefix.
 */
export function invalidateCacheByPrefix(prefix: string): void {
	for (const key of cache.keys()) {
		if (key.startsWith(prefix)) {
			cache.delete(key);
		}
	}
}

/**
 * Clear the entire cache.
 */
export function clearCache(): void {
	cache.clear();
}

export interface CacheStats {
	key: string;
	ageMs: number;
	ageFormatted: string;
	expiresInMs: number;
	expiresInFormatted: string;
}

/**
 * Get stats for all cache entries.
 */
export function getCacheStats(): CacheStats[] {
	const now = Date.now();
	const stats: CacheStats[] = [];

	for (const [key, entry] of cache.entries()) {
		const ageMs = now - entry.createdAt;
		const expiresInMs = Math.max(0, entry.expiresAt - now);

		stats.push({
			key,
			ageMs,
			ageFormatted: formatDuration(ageMs),
			expiresInMs,
			expiresInFormatted: formatDuration(expiresInMs)
		});
	}

	return stats;
}

function formatDuration(ms: number): string {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	if (hours > 0) {
		return `${hours}h ${minutes % 60}m`;
	}
	if (minutes > 0) {
		return `${minutes}m ${seconds % 60}s`;
	}
	return `${seconds}s`;
}
