<!-- src/lib/CompetitionCard.svelte -->
<script lang="ts">
	import { t } from '$lib/translations';
	export let competition;
</script>

<div class="card-compact bg-base-100 w-96 shadow">
	<div class="card-body items-center text-center">
		<h2 class="card-title">
			<a href="{`/competitions/${competition.id}`}" class="text-primary">
				{competition.name}
			</a>
		</h2>
		<ul class="my-4 space-y-3 flex flex-col items-center">
			<li>
				<a
					role="button"
					class="btn btn-primary"
					href="https://live.worldcubeassociation.org/link/competitions/{competition.id}"
					target="_blank">WCA Live</a
				>
			</li>
			<li>
				<a
					role="button"
					class="btn btn-primary"
					href="https://www.competitiongroups.com/competitions/{competition.id}"
					target="_blank">{$t('content.grouping')}</a
				>
			</li>
			<li>
				<a
					role="button"
					class="btn btn-primary"
					href="https://www.worldcubeassociation.org/competitions/{competition.id}#competition-schedule"
					target="_blank">{$t('content.schedule')}</a
				>
			</li>
			<li>
				<a
					role="button"
					class="btn btn-primary"
					href="https://www.worldcubeassociation.org/competitions/{competition.id}#general-info"
					target="_blank">{$t('content.info')}</a
				>
			</li>
		</ul>
	</div>
</div>
