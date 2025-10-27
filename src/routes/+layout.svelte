<script lang="ts">
	import { t, locales, locale } from '$lib/translations';
	import { THEME_CONFIG, EXTERNAL_URLS } from '$lib/config';
	import { onMount } from 'svelte';

	// Use WebP with PNG fallback
	const logoWebP = '/logo.webp';
	const logoPNG = '/logo.png';

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

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">GCA Live</a>
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
			<!-- sun icon -->
			<svg
				class="swap-on h-10 w-10 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
				></path>
			</svg>
			<!-- moon icon -->
			<svg
				class="swap-off h-10 w-10 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
				></path>
			</svg>
		</label>
	</div>
	<div class="flex-none">
		<label for="language-select" class="sr-only">Select language</label>
		<select
			id="language-select"
			bind:value={$locale}
			class="select select-primary w-full max-w-xs"
			aria-label="Language selector"
		>
			{#each $locales as value}
				<option value={value}>{$t(`lang.${value}`)}</option>
			{/each}
		</select>
	</div>
</div>

<slot />

<footer
	class="footer fixed bottom-0 bg-primary text-neutral-content p-4 grid grid-cols-2 justify-items-stretch"
>
	<aside class="grid-flow-col">
		<a
			href={EXTERNAL_URLS.gcaWebsite}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
		>
			<picture>
				<source srcset={logoWebP} type="image/webp" />
				<img src={logoPNG} class="h-8" alt="GCA Logo" loading="lazy" />
			</picture>
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
