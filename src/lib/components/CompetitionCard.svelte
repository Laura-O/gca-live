<!-- src/lib/CompetitionCard.svelte -->
<script lang="ts">
	import { t } from '$lib/translations';
	export let competition;
	export let showQRButton: boolean;
	import QRCode from '$lib/components/QRCode.svelte';
	let isModalOpen = false;
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
		{#if showQRButton}
			<div class="flex justify-end w-full">
				<button class="modal-button" on:click="{() => (isModalOpen = true)}"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
						></path>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
						></path>
					</svg></button
				>
			</div>
		{/if}
	</div>
</div>
<div class="modal" class:modal-open="{isModalOpen}">
	<div class="modal-box">
		<QRCode
			url="{`https://live.germancubeassociation.de/competitions/${competition.id}`}"
		/>
		<div class="modal-action">
			<!-- 🔵 set false on click -->
			<button class="btn" on:click="{() => (isModalOpen = false)}">Close</button
			>
		</div>
	</div>
</div>
