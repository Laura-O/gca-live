import { describe, it, expect } from 'vitest';
import {
	EXTERNAL_URLS,
	API_CONFIG,
	THEME_CONFIG,
	LOCALE_CONFIG,
	SEO_CONFIG
} from './config';

describe('Configuration', () => {
	describe('EXTERNAL_URLS', () => {
		it('should generate correct WCA Live URL', () => {
			const url = EXTERNAL_URLS.wcaLive('test-comp-2025');
			expect(url).toBe(
				'https://live.worldcubeassociation.org/link/competitions/test-comp-2025'
			);
		});

		it('should generate correct Competition Groups URL', () => {
			const url = EXTERNAL_URLS.competitionGroups('test-comp-2025');
			expect(url).toBe(
				'https://www.competitiongroups.com/competitions/test-comp-2025'
			);
		});

		it('should generate correct WCA Schedule URL', () => {
			const url = EXTERNAL_URLS.wcaSchedule('test-comp-2025');
			expect(url).toBe(
				'https://www.worldcubeassociation.org/competitions/test-comp-2025#competition-schedule'
			);
		});

		it('should generate correct WCA Info URL', () => {
			const url = EXTERNAL_URLS.wcaInfo('test-comp-2025');
			expect(url).toBe(
				'https://www.worldcubeassociation.org/competitions/test-comp-2025#general-info'
			);
		});

		it('should generate correct GCA Live URL', () => {
			const url = EXTERNAL_URLS.gcaLive('test-comp-2025');
			expect(url).toBe(
				'https://live.germancubeassociation.de/competitions/test-comp-2025'
			);
		});

		it('should have correct social media URLs', () => {
			expect(EXTERNAL_URLS.instagram).toBe(
				'https://www.instagram.com/germancubeassociation/'
			);
			expect(EXTERNAL_URLS.discord).toBe('https://discord.gg/wvSPg8k9');
			expect(EXTERNAL_URLS.gcaWebsite).toBe(
				'https://www.germancubeassociation.de/'
			);
		});
	});

	describe('API_CONFIG', () => {
		it('should have correct default values', () => {
			expect(API_CONFIG.defaultRegion).toBe('DE');
			expect(API_CONFIG.defaultDays).toBe(7);
			expect(API_CONFIG.maxDays).toBe(365);
		});

		it('should have correct cache and timeout settings', () => {
			expect(API_CONFIG.cacheTtl).toBe(5 * 60 * 1000); // 5 minutes
			expect(API_CONFIG.requestTimeout).toBe(5000); // 5 seconds
		});

		it('should have valid WCA Base URL', () => {
			expect(API_CONFIG.wcaBaseUrl).toContain('github');
			expect(API_CONFIG.wcaBaseUrl).toContain('wca-rest-api');
		});
	});

	describe('THEME_CONFIG', () => {
		it('should have two themes', () => {
			expect(THEME_CONFIG.themes).toHaveLength(2);
			expect(THEME_CONFIG.themes).toContain('light');
			expect(THEME_CONFIG.themes).toContain('dark');
		});

		it('should have correct default theme', () => {
			expect(THEME_CONFIG.defaultTheme).toBe('light');
			expect(THEME_CONFIG.darkTheme).toBe('dark');
		});

		it('should have correct cookie max age', () => {
			const oneYear = 60 * 60 * 24 * 365;
			expect(THEME_CONFIG.cookieMaxAge).toBe(oneYear);
		});
	});

	describe('LOCALE_CONFIG', () => {
		it('should have German as default locale', () => {
			expect(LOCALE_CONFIG.defaultLocale).toBe('de');
		});

		it('should have two available locales', () => {
			expect(LOCALE_CONFIG.availableLocales).toHaveLength(2);
			expect(LOCALE_CONFIG.availableLocales).toContain('de');
			expect(LOCALE_CONFIG.availableLocales).toContain('en');
		});
	});

	describe('SEO_CONFIG', () => {
		it('should have correct site information', () => {
			expect(SEO_CONFIG.siteName).toBe('GCA Live');
			expect(SEO_CONFIG.siteUrl).toBe('https://live.germancubeassociation.de');
		});

		it('should have descriptions in both languages', () => {
			expect(SEO_CONFIG.defaultDescription.de).toBeDefined();
			expect(SEO_CONFIG.defaultDescription.en).toBeDefined();
			expect(SEO_CONFIG.defaultDescription.de).toContain('Wettbewerbe');
			expect(SEO_CONFIG.defaultDescription.en).toContain('competitions');
		});

		it('should have correct organization data', () => {
			expect(SEO_CONFIG.organization.name).toBe('German Cube Association');
			expect(SEO_CONFIG.organization.url).toContain('germancubeassociation.de');
		});
	});
});
