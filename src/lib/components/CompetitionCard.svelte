<!-- src/lib/CompetitionCard.svelte -->
<script lang="ts">
	import { t } from '$lib/translations';
	import type { Competition } from '$lib/types/competition';
	import { EXTERNAL_URLS } from '$lib/config';
	import QRCode from '$lib/components/QRCode.svelte';

	export let competition: Competition;
	export let showQRButton: boolean;

	let isModalOpen = false;
</script>

<div class="card-compact bg-base-100 w-96 shadow">
	<div class="card-body items-center text-center">
		<h2 class="card-title">
			<a href={`/competitions/${competition.id}`}>
				{competition.name}
			</a>
		</h2>
		<ul class="my-4 space-y-3 flex flex-col items-center">
			<li>
				<a
					role="button"
					class="btn btn-primary"
					href={EXTERNAL_URLS.wcaLive(competition.id)}
					target="_blank"
					rel="noopener noreferrer">WCA Live</a
				>
			</li>
			<li>
				<a
					role="button"
					class="btn btn-primary"
					href={EXTERNAL_URLS.competitionGroups(competition.id)}
					target="_blank"
					rel="noopener noreferrer">{$t('content.grouping')}</a
				>
			</li>
			<li>
				<a
					role="button"
					class="btn btn-primary"
					href={EXTERNAL_URLS.wcaSchedule(competition.id)}
					target="_blank"
					rel="noopener noreferrer">{$t('content.schedule')}</a
				>
			</li>
			<li>
				<a
					role="button"
					class="btn btn-primary"
					href={EXTERNAL_URLS.wcaInfo(competition.id)}
					target="_blank"
					rel="noopener noreferrer">{$t('content.info')}</a
				>
			</li>
		</ul>
		{#if showQRButton}
			<div class="flex justify-end w-full">
				<button
					class="modal-button"
					aria-label={$t('content.show-qr-code')}
					on:click={() => (isModalOpen = true)}
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
<div class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box">
		<QRCode url={EXTERNAL_URLS.gcaLive(competition.id)} />
		<div class="modal-action">
			<button class="btn" on:click={() => (isModalOpen = false)}
				>{$t('content.close')}</button
			>
		</div>
	</div>
</div>
