<script lang="ts">
	export let data;
	import CompetitionCard from '$lib/components/CompetitionCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { t } from '$lib/translations';
	const { competition } = data;

	$: competitionDescription = `${$t('content.schedule')} and information for ${competition.name}. View details, schedule, and competition groups.`;
</script>

<SEO
	title={competition.name}
	description={competitionDescription}
	url={`/competitions/${competition.id}`}
	type="article"
/>

<div class="min-h-[70vh] flex items-center justify-center p-6">
	<CompetitionCard competition={competition} showQRButton={true} />
</div>
