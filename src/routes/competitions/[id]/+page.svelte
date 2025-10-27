<script lang="ts">
	export let data;
	import CompetitionCard from '$lib/components/CompetitionCard.svelte';
	const { competition } = data;
</script>

<div
	class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center"
>
	<CompetitionCard competition={competition} showQRButton={true} />
</div>
