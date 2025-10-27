import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	// Read theme and locale from cookies with defaults
	const theme = cookies.get('theme') || 'emerald';
	const locale = cookies.get('locale') || 'de';

	return {
		theme,
		locale
	};
};
