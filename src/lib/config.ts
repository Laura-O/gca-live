/**
 * Application configuration
 * Centralized configuration for URLs, constants, and settings
 */

/**
 * External service URLs
 */
export const EXTERNAL_URLS = {
	/**
	 * WCA Live competition URL
	 */
	wcaLive: (competitionId: string) =>
		`https://live.worldcubeassociation.org/link/competitions/${competitionId}`,

	/**
	 * Competition Groups URL
	 */
	competitionGroups: (competitionId: string) =>
		`https://www.competitiongroups.com/competitions/${competitionId}`,

	/**
	 * WCA Competition Schedule URL
	 */
	wcaSchedule: (competitionId: string) =>
		`https://www.worldcubeassociation.org/competitions/${competitionId}#competition-schedule`,

	/**
	 * WCA Competition General Info URL
	 */
	wcaInfo: (competitionId: string) =>
		`https://www.worldcubeassociation.org/competitions/${competitionId}#general-info`,

	/**
	 * WCA Competitions List URL
	 */
	wcaCompetitionsList:
		'https://www.worldcubeassociation.org/competitions?region=Germany&search=&state=present&year=all+years&from_date=&to_date=&delegate=&display=list',

	/**
	 * GCA Competition URL (for QR codes)
	 */
	gcaLive: (competitionId: string) =>
		`https://live.germancubeassociation.de/competitions/${competitionId}`,

	/**
	 * Social media URLs
	 */
	instagram: 'https://www.instagram.com/germancubeassociation/',
	discord: 'https://discord.gg/wvSPg8k9',

	/**
	 * GCA Website
	 */
	gcaWebsite: 'https://www.germancubeassociation.de/'
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
	/**
	 * Default region for competitions (country name)
	 */
	defaultRegion: 'Germany',

	/**
	 * Default number of days to show competitions for
	 */
	defaultDays: 7,

	/**
	 * Maximum number of days allowed
	 */
	maxDays: 365
} as const;

/**
 * Theme configuration
 */
export const THEME_CONFIG = {
	/**
	 * Available themes
	 */
	themes: ['light', 'dark'] as const,

	/**
	 * Default light theme
	 */
	defaultTheme: 'light' as const,

	/**
	 * Dark theme
	 */
	darkTheme: 'dark' as const,

	/**
	 * Cookie max age (1 year in seconds)
	 */
	cookieMaxAge: 60 * 60 * 24 * 365
} as const;

/**
 * Locale configuration
 */
export const LOCALE_CONFIG = {
	/**
	 * Default locale
	 */
	defaultLocale: 'de',

	/**
	 * Available locales
	 */
	availableLocales: ['de', 'en'] as const
} as const;

/**
 * SEO configuration
 */
export const SEO_CONFIG = {
	/**
	 * Site name
	 */
	siteName: 'GCA Live',

	/**
	 * Site URL
	 */
	siteUrl: 'https://live.germancubeassociation.de',

	/**
	 * Default meta description
	 */
	defaultDescription: {
		en: "View live Rubik's Cube competitions in Germany. Get real-time updates, schedules, and competition information from the German Cube Association.",
		de: "Verfolgen Sie Live-Rubik's Cube-Wettbewerbe in Deutschland. Erhalten Sie Echtzeit-Updates, Zeitpläne und Wettbewerbsinformationen vom German Cube Association."
	},

	/**
	 * Twitter handle (without @)
	 */
	twitterHandle: 'germancubeassoc',

	/**
	 * Organization schema
	 */
	organization: {
		name: 'German Cube Association',
		url: 'https://www.germancubeassociation.de',
		logo: 'https://live.germancubeassociation.de/logo.png'
	}
} as const;
