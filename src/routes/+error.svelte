<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations';
	import SEO from '$lib/components/SEO.svelte';

	$: error = $page.error;
	$: status = $page.status;
</script>

<SEO title={`Error ${status}`} description="An error occurred" />

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">{status}</h1>
			<p class="py-6 text-xl">
				{#if status === 404}
					{$t('content.error-404') || 'Page not found'}
				{:else if status === 500}
					{$t('content.error-500') || 'Internal server error'}
				{:else}
					{error?.message || 'An unexpected error occurred'}
				{/if}
			</p>
			<a href="/" class="btn btn-primary"
				>{$t('content.back-home') || 'Go back home'}</a
			>
		</div>
	</div>
</div>
