import i18n from 'sveltekit-i18n';
import lang from './translations/lang.json';

/** @type {import('sveltekit-i18n').Config} */
const config = {
	translations: {
		en: { lang },
		de: { lang }
	},
	loaders: [
		{
			locale: 'de',
			key: 'content',
			loader: async () =>
				(await import('./translations/de/content.json')).default
		},
		{
			locale: 'en',
			key: 'content',
			loader: async () =>
				(await import('./translations/en/content.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(
	config
);
