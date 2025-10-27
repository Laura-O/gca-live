<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/translations';
	import { EXTERNAL_URLS } from '$lib/config';
	import CompetitionCard from '$lib/components/CompetitionCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	export let data;

	// Update the URL with the selected `days` value
	function updateDays(event: Event) {
		const days = (event.target as HTMLSelectElement).value;
		goto(`?days=${days}`);
	}
</script>

<SEO url="/" />

<div
	class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center"
>
	{#if data.competitions.length === 0}
		<div class="card bg-base-100 w-96 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{$t('content.nocomps-title')}</h2>
				<p>{$t('content.nocomps-content')}</p>
				<div class="card-actions justify-center">
					<a
						href={EXTERNAL_URLS.wcaCompetitionsList}
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-primary"
					>
						{$t('content.wca-page')}
					</a>
				</div>
			</div>
		</div>
	{:else}
		{#each data.competitions as competition}
			<CompetitionCard competition={competition} showQRButton={false} />
		{/each}
	{/if}
</div>
<div class="container mx-auto pb-24 place-items-center">
	<label for="days" class="block mb-2">{$t('content.days-label')}</label>
	<select
		id="days"
		class="select select-bordered w-full max-w-xs"
		on:change={updateDays}
	>
		<option value="7" selected={data.days === 7}>{$t('content.days-7')}</option>
		<option value="30" selected={data.days === 30}
			>{$t('content.days-30')}</option
		>
		<option value="90" selected={data.days === 90}
			>{$t('content.days-90')}</option
		>
	</select>
</div>
