<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/translations';
	import { EXTERNAL_URLS } from '$lib/config';
	import CompetitionCard from '$lib/components/CompetitionCard.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import SEO from '$lib/components/SEO.svelte';
	export let data;

	// Update the URL with the selected `days` value
	function updateDays(event: Event) {
		const days = (event.target as HTMLSelectElement).value;
		goto(`?days=${days}`);
	}
</script>

<SEO url="/" />

<div class="container mx-auto px-6 py-12">
	<!-- Hero Section -->
	<div class="text-center mb-12 animate-fade-in">
		<h1 class="text-4xl md:text-5xl font-bold gradient-text mb-4">
			{$t('content.comp') || 'Competitions'}
		</h1>
		<p class="text-lg text-base-content/70">
			Live Rubik's Cube competitions in Germany
		</p>
	</div>

	<!-- Competition Grid -->
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center mb-12"
	>
		{#if data.competitions.length === 0}
			<div class="col-span-full">
				<div class="modern-card w-full max-w-2xl mx-auto p-8 text-center">
					<div class="text-6xl mb-4">🎲</div>
					<h2 class="text-2xl font-bold mb-4">{$t('content.nocomps-title')}</h2>
					<p class="text-base-content/70 mb-6">
						{$t('content.nocomps-content')}
					</p>
					<LinkButton href={EXTERNAL_URLS.wcaCompetitionsList} external>
						{$t('content.wca-page')}
					</LinkButton>
				</div>
			</div>
		{:else}
			{#each data.competitions as competition}
				<CompetitionCard competition={competition} showQRButton={false} />
			{/each}
		{/if}
	</div>

	<!-- Filter Section -->
	<div class="flex flex-col items-center gap-4 pb-32 md:pb-28">
		<label for="days" class="text-sm font-medium text-base-content/70">
			{$t('content.days-label')}
		</label>
		<select
			id="days"
			class="select select-bordered select-primary w-full max-w-xs shadow-soft transition-all duration-200 focus:shadow-card-hover"
			on:change={updateDays}
		>
			<option value="7" selected={data.days === 7}
				>{$t('content.days-7')}</option
			>
			<option value="30" selected={data.days === 30}
				>{$t('content.days-30')}</option
			>
			<option value="90" selected={data.days === 90}
				>{$t('content.days-90')}</option
			>
		</select>
	</div>
</div>
