<script lang="ts">
	import { SEO_CONFIG } from '$lib/config';
	import { locale } from '$lib/translations';

	export let title: string = '';
	export let description: string = '';
	export let url: string = '';
	export let image: string = '';
	export let type: 'website' | 'article' = 'website';

	$: currentLocale = $locale as 'de' | 'en';
	$: fullTitle = title
		? `${title} | ${SEO_CONFIG.siteName}`
		: SEO_CONFIG.siteName;
	$: defaultDescription =
		SEO_CONFIG.defaultDescription[currentLocale] ||
		SEO_CONFIG.defaultDescription.en;
	$: metaDescription = description || defaultDescription;
	$: fullUrl = url ? `${SEO_CONFIG.siteUrl}${url}` : SEO_CONFIG.siteUrl;
	$: ogImage = image || `${SEO_CONFIG.siteUrl}/logo.png`;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={metaDescription} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={SEO_CONFIG.siteName} />
	<meta
		property="og:locale"
		content={currentLocale === 'de' ? 'de_DE' : 'en_US'}
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={fullUrl} />
	<meta property="twitter:title" content={fullTitle} />
	<meta property="twitter:description" content={metaDescription} />
	<meta property="twitter:image" content={ogImage} />
	{#if SEO_CONFIG.twitterHandle}
		<meta property="twitter:site" content={`@${SEO_CONFIG.twitterHandle}`} />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={fullUrl} />

	<!-- Additional Meta Tags -->
	<meta name="robots" content="index, follow" />
	<meta
		name="language"
		content={currentLocale === 'de' ? 'German' : 'English'}
	/>
	<meta name="author" content={SEO_CONFIG.organization.name} />

	<!-- Structured Data (JSON-LD) -->
	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: SEO_CONFIG.organization.name,
			url: SEO_CONFIG.organization.url,
			logo: SEO_CONFIG.organization.logo,
			sameAs: [
				'https://www.instagram.com/germancubeassociation/',
				'https://discord.gg/wvSPg8k9'
			]
		})}
	</script>
</svelte:head>
