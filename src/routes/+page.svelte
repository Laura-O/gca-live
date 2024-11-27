<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/translations';
	import CompetitionCard from '$lib/components/CompetitionCard.svelte';
	export let data;

	// Update the URL with the selected `days` value
	function updateDays(event: Event) {
		const days = (event.target as HTMLSelectElement).value;
		goto(`?days=${days}`);
	}
</script>

<div
	class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center"
>
	{#if data.competitions.length === 0}
		<div class="card bg-base-100 w-96 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{$t('content.nocomps-title')}</h2>
				<p>{$t('content.nocomps-content')}</p>
				<div class="card-actions justify-center">
					<button class="btn btn-primary">
						<a
							href="https://www.worldcubeassociation.org/competitions?region=Germany&search=&state=present&year=all+years&from_date=&to_date=&delegate=&display=list"
							>{$t('content.wca-page')}</a
						>
					</button>
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
	<label for="days" class="block mb-2">Show competitions for the next:</label>
	<select
		id="days"
		class="select select-bordered w-full max-w-xs"
		on:change={updateDays}
	>
		<option value="7" selected={data.days === 7}>7 days</option>
		<option value="30" selected={data.days === 30}>30 days</option>
		<option value="90" selected={data.days === 90}>90 days</option>
	</select>
</div>
