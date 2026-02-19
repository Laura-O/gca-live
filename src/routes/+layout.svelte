<script lang="ts">
	import { t, locales, locale } from '$lib/translations';
	import { THEME_CONFIG, EXTERNAL_URLS } from '$lib/config';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Toast from '$lib/components/Toast.svelte';

	const logoLight = '/logo-gca.svg';
	const logoDark = '/logo-gca-dark.svg';
	const logoOld = '/logo.png';

	import '../app.css';

	export let data;

	const { themes, defaultTheme, darkTheme, cookieMaxAge } = THEME_CONFIG;
	type Theme = (typeof THEME_CONFIG.themes)[number];

	let current_theme: Theme = (data.theme as Theme) || defaultTheme;
	let isDarkTheme: boolean = current_theme === darkTheme;

	onMount(() => {
		if (typeof window !== 'undefined') {
			// Apply the theme from server-side load
			if (current_theme && themes.includes(current_theme)) {
				document.documentElement.setAttribute('data-theme', current_theme);
				isDarkTheme = current_theme === darkTheme;
			}
		}
	});

	function set_theme() {
		const new_theme: Theme =
			current_theme === defaultTheme ? darkTheme : defaultTheme;
		window.localStorage.setItem('theme', new_theme);
		document.cookie = `theme=${new_theme}; max-age=${cookieMaxAge}; path=/; SameSite=Strict;`;
		document.documentElement.setAttribute('data-theme', new_theme);
		current_theme = new_theme;
		isDarkTheme = new_theme === darkTheme;
	}
</script>

<!-- Subtle background -->
<div class="fixed inset-0 bg-base-100 pointer-events-none -z-10"></div>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:z-skip-link focus:p-4 focus:bg-primary focus:text-white focus:rounded-lg focus:top-4 focus:left-4 focus:shadow-soft"
>
	{$t('content.skip-to-content') || 'Skip to main content'}
</a>

<nav
	class="sticky top-0 z-40 bg-base-100/95 backdrop-blur-md border-b border-primary-200/50 dark:border-primary-800/50 shadow-sm"
>
	<div class="navbar">
		<div class="flex-1">
			<a
				href="/"
				class="flex items-center p-2 rounded-lg hover:bg-base-200 transition-colors"
			>
				{#if isDarkTheme}
					<img src={logoDark} class="h-8" alt="GCA Live" />
				{:else}
					<img src={logoLight} class="h-8" alt="GCA Live" />
				{/if}
			</a>
		</div>
		<div class="flex-none mr-2">
			<label class="swap swap-rotate" aria-label="Toggle theme">
				<input
					type="checkbox"
					class="theme-controller"
					bind:checked={isDarkTheme}
					on:change={() => set_theme()}
					aria-label="Toggle dark mode"
				/>
				<!-- Awake sloth (shown in dark mode → click to switch to light) -->
				<svg
					class="swap-on h-10 w-10"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 36 36"
				>
					<!-- Head -->
					<circle cx="18" cy="18" r="15" fill="#BFA37A" />
					<!-- Fur tufts -->
					<circle cx="7" cy="10" r="4" fill="#BFA37A" />
					<circle cx="29" cy="10" r="4" fill="#BFA37A" />
					<circle cx="5" cy="18" r="3.5" fill="#BFA37A" />
					<circle cx="31" cy="18" r="3.5" fill="#BFA37A" />
					<circle cx="9" cy="6" r="3" fill="#BFA37A" />
					<circle cx="27" cy="6" r="3" fill="#BFA37A" />
					<!-- Face -->
					<ellipse cx="18" cy="19" rx="11" ry="10" fill="#E4D5B8" />
					<!-- Eye patches -->
					<ellipse cx="13" cy="16" rx="4.5" ry="3.5" fill="#5C4633" />
					<ellipse cx="23" cy="16" rx="4.5" ry="3.5" fill="#5C4633" />
					<!-- Eyes (open, awake) -->
					<circle cx="13" cy="16" r="2.5" fill="#F5EDE0" />
					<circle cx="23" cy="16" r="2.5" fill="#F5EDE0" />
					<circle cx="13.5" cy="16.5" r="1.5" fill="#1A0E08" />
					<circle cx="23.5" cy="16.5" r="1.5" fill="#1A0E08" />
					<circle cx="13" cy="15.5" r="0.6" fill="white" opacity="0.7" />
					<circle cx="23" cy="15.5" r="0.6" fill="white" opacity="0.7" />
					<!-- Nose -->
					<ellipse cx="18" cy="21" rx="2" ry="1.3" fill="#3D2B1F" />
					<!-- Smile -->
					<path d="M15 24 Q18 27 21 24" fill="none" stroke="#7A6550" stroke-width="0.8" stroke-linecap="round" />
				</svg>
				<!-- Sleeping sloth (shown in light mode → click to switch to dark) -->
				<svg
					class="swap-off h-10 w-10"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 36 36"
				>
					<!-- Head -->
					<circle cx="18" cy="18" r="15" fill="#BFA37A" />
					<!-- Fur tufts -->
					<circle cx="7" cy="10" r="4" fill="#BFA37A" />
					<circle cx="29" cy="10" r="4" fill="#BFA37A" />
					<circle cx="5" cy="18" r="3.5" fill="#BFA37A" />
					<circle cx="31" cy="18" r="3.5" fill="#BFA37A" />
					<circle cx="9" cy="6" r="3" fill="#BFA37A" />
					<circle cx="27" cy="6" r="3" fill="#BFA37A" />
					<!-- Face -->
					<ellipse cx="18" cy="19" rx="11" ry="10" fill="#E4D5B8" />
					<!-- Eye patches -->
					<ellipse cx="13" cy="16" rx="4.5" ry="3.5" fill="#5C4633" />
					<ellipse cx="23" cy="16" rx="4.5" ry="3.5" fill="#5C4633" />
					<!-- Eyes (closed, sleeping) -->
					<path d="M10 16.5 Q13 14.5 16 16.5" fill="none" stroke="#E4D5B8" stroke-width="1.5" stroke-linecap="round" />
					<path d="M20 16.5 Q23 14.5 26 16.5" fill="none" stroke="#E4D5B8" stroke-width="1.5" stroke-linecap="round" />
					<!-- Nose -->
					<ellipse cx="18" cy="21" rx="2" ry="1.3" fill="#3D2B1F" />
					<!-- Sleepy smile -->
					<path d="M15 24 Q18 27 21 24" fill="none" stroke="#7A6550" stroke-width="0.8" stroke-linecap="round" />
					<!-- Zzz -->
					<text x="27" y="10" font-size="5" font-weight="bold" fill="#7A6550" opacity="0.7" font-family="Inter, sans-serif">z</text>
					<text x="30" y="7" font-size="4" font-weight="bold" fill="#7A6550" opacity="0.5" font-family="Inter, sans-serif">z</text>
				</svg>
			</label>
		</div>
		<div class="flex-none">
			<label for="language-select" class="sr-only">Select language</label>
			<div class="relative">
				<select
					id="language-select"
					bind:value={$locale}
					class="select select-bordered select-sm bg-base-100/80 backdrop-blur-sm border-primary-200/50 dark:border-primary-800/50 pr-10 font-medium shadow-soft transition-all duration-300 hover:shadow-glow focus:shadow-glow focus:border-primary-500 focus:scale-105 cursor-pointer appearance-none"
					aria-label="Language selector"
				>
					{#each $locales as value}
						<option value={value}>
							{#if value === 'de'}
								🇩🇪 {$t(`lang.${value}`)}
							{:else if value === 'en'}
								🇬🇧 {$t(`lang.${value}`)}
							{:else}
								{$t(`lang.${value}`)}
							{/if}
						</option>
					{/each}
				</select>
				<!-- Custom dropdown arrow -->
				<div
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
				>
					<svg
						class="h-4 w-4 text-base-content/50"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</div>
			</div>
		</div>
	</div>
</nav>

<main id="main-content">
	{#key $page.url.pathname}
		<div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
			<slot />
		</div>
	{/key}
</main>

<footer
	class="footer fixed bottom-0 bg-base-100/95 backdrop-blur-md border-t border-primary-200/50 dark:border-primary-800/50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] p-4 grid grid-cols-2 justify-items-stretch"
>
	<aside class="grid-flow-col">
		<a
			href={EXTERNAL_URLS.gcaWebsite}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
		>
			<img src={logoOld} class="h-8" alt="GCA Logo" loading="lazy" />
		</a>
	</aside>
	<nav class="grid-flow-col justify-self-end space-x-3">
		<a
			href={EXTERNAL_URLS.instagram}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Visit us on Instagram"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				fill="currentColor"
				class="bi bi-instagram"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
				></path>
			</svg>
		</a>
		<a
			href={EXTERNAL_URLS.discord}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Join us on Discord"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"
				></path>
			</svg>
		</a>
	</nav>
</footer>

<Toast />
