<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations';
	import SEO from '$lib/components/SEO.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';

	$: error = $page.error;
	$: status = $page.status;
</script>

<SEO title={`Error ${status}`} description="An error occurred" />

<div class="hero min-h-screen">
	<div class="hero-content text-center">
		<div class="modern-card max-w-lg p-12 animate-scale-in">
			<div class="text-8xl mb-6 gradient-text font-bold">{status}</div>
			<p class="text-xl mb-8 text-base-content/80">
				{#if status === 404}
					{$t('content.error-404') || 'Page not found'}
				{:else if status === 500}
					{$t('content.error-500') || 'Internal server error'}
				{:else}
					{error?.message || 'An unexpected error occurred'}
				{/if}
			</p>
			<LinkButton href="/"
				>{$t('content.back-home') || 'Go back home'}</LinkButton
			>
		</div>
	</div>
</div>
