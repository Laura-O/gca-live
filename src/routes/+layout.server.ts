import type { LayoutServerLoad } from './$types';
import { THEME_CONFIG, LOCALE_CONFIG } from '$lib/config';

export const load: LayoutServerLoad = async ({ cookies }) => {
	// Read theme and locale from cookies with defaults
	const theme = cookies.get('theme') || THEME_CONFIG.defaultTheme;
	const locale = cookies.get('locale') || LOCALE_CONFIG.defaultLocale;

	return {
		theme,
		locale
	};
};
