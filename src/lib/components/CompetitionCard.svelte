<!-- src/lib/CompetitionCard.svelte -->
<script lang="ts">
	import { t } from '$lib/translations';
	import type { Competition } from '$lib/types/competition';
	import { EXTERNAL_URLS } from '$lib/config';
	import QRCode from '$lib/components/QRCode.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';

	export let competition: Competition;
	export let showQRButton: boolean;

	let isModalOpen = false;

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<div class="modern-card w-full max-w-card overflow-hidden group">
	<div class="card-body items-center text-center p-6">
		<h2 class="card-title text-xl font-semibold mb-4">
			<a
				href={`/competitions/${competition.id}`}
				class="hover:gradient-text transition-all duration-300"
			>
				{competition.name}
			</a>
		</h2>
		<ul class="my-4 space-y-3 flex flex-col items-center w-full">
			<li class="w-full max-w-xs">
				<LinkButton
					href={EXTERNAL_URLS.wcaLive(competition.id)}
					external
					className="w-full"
				>
					WCA Live
				</LinkButton>
			</li>
			<li class="w-full max-w-xs">
				<LinkButton
					href={EXTERNAL_URLS.competitionGroups(competition.id)}
					external
					className="w-full"
				>
					{$t('content.grouping')}
				</LinkButton>
			</li>
			<li class="w-full max-w-xs">
				<LinkButton
					href={EXTERNAL_URLS.wcaSchedule(competition.id)}
					external
					className="w-full"
				>
					{$t('content.schedule')}
				</LinkButton>
			</li>
			<li class="w-full max-w-xs">
				<LinkButton
					href={EXTERNAL_URLS.wcaInfo(competition.id)}
					external
					className="w-full"
				>
					{$t('content.info')}
				</LinkButton>
			</li>
		</ul>
		{#if showQRButton}
			<div class="flex justify-end w-full mt-4">
				<button
					type="button"
					class="p-3 rounded-xl bg-primary text-white hover:bg-primary-600 transition-all duration-200 shadow-soft hover:shadow-card-hover cursor-pointer"
					aria-label={$t('content.show-qr-code')}
					on:click|stopPropagation={openModal}
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
{#if isModalOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<!-- Backdrop -->
		<div
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			on:click={closeModal}
			on:keydown={(e) => e.key === 'Escape' && closeModal()}
			role="button"
			tabindex="-1"
		></div>
		<!-- Modal content -->
		<div
			class="relative z-10 bg-base-100 rounded-xl p-6 shadow-xl max-w-sm mx-4"
		>
			<QRCode url={EXTERNAL_URLS.gcaLive(competition.id)} />
			<div class="mt-4 flex justify-center">
				<button type="button" class="btn btn-primary" on:click={closeModal}>
					{$t('content.close')}
				</button>
			</div>
		</div>
	</div>
{/if}
