<script lang="ts">
	import { t } from '$lib/translations';
	import CompetitionCard from '$lib/components/CompetitionCard.svelte';
	export let data;
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
			<CompetitionCard competition="{competition}" showQRButton="{false}" />
		{/each}
	{/if}
</div>
