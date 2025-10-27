import { loadTranslations } from '$lib/translations';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data }) => {
	const { pathname } = url;

	// Use locale from server load data
	const initLocale = data.locale || 'de';

	await loadTranslations(initLocale, pathname); // keep this just before the `return`

	// Pass through server data (theme, locale)
	return {
		...data
	};
};
