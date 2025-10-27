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

<div
	class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center"
>
	<CompetitionCard competition={competition} showQRButton={true} />
</div>
