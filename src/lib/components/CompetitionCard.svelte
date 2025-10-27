<!-- src/lib/CompetitionCard.svelte -->
<script lang="ts">
	import { t } from '$lib/translations';
	import type { Competition } from '$lib/types/competition';
	import { EXTERNAL_URLS } from '$lib/config';
	import QRCode from '$lib/components/QRCode.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { createFocusTrap } from 'focus-trap';

	export let competition: Competition;
	export let showQRButton: boolean;

	let isModalOpen = false;
	let modalElement: HTMLDivElement;
	let focusTrap: ReturnType<typeof createFocusTrap> | null = null;

	$: if (isModalOpen && modalElement) {
		activateFocusTrap();
	} else if (focusTrap) {
		deactivateFocusTrap();
	}

	function activateFocusTrap() {
		if (!focusTrap && modalElement) {
			focusTrap = createFocusTrap(modalElement, {
				escapeDeactivates: true,
				clickOutsideDeactivates: true,
				onDeactivate: () => {
					isModalOpen = false;
				}
			});
			focusTrap.activate();
		}
	}

	function deactivateFocusTrap() {
		if (focusTrap) {
			focusTrap.deactivate();
			focusTrap = null;
		}
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
		<ul class="my-4 space-y-3 flex flex-col items-center">
			<li>
				<LinkButton href={EXTERNAL_URLS.wcaLive(competition.id)} external>
					WCA Live
				</LinkButton>
			</li>
			<li>
				<LinkButton
					href={EXTERNAL_URLS.competitionGroups(competition.id)}
					external
				>
					{$t('content.grouping')}
				</LinkButton>
			</li>
			<li>
				<LinkButton href={EXTERNAL_URLS.wcaSchedule(competition.id)} external>
					{$t('content.schedule')}
				</LinkButton>
			</li>
			<li>
				<LinkButton href={EXTERNAL_URLS.wcaInfo(competition.id)} external>
					{$t('content.info')}
				</LinkButton>
			</li>
		</ul>
		{#if showQRButton}
			<div class="flex justify-end w-full mt-4">
				<button
					class="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white hover:shadow-glow transition-all duration-300 hover:scale-110"
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
<div class="modal" class:modal-open={isModalOpen} bind:this={modalElement}>
	<div class="modal-box glass-card">
		<QRCode url={EXTERNAL_URLS.gcaLive(competition.id)} />
		<div class="modal-action">
			<button
				class="btn btn-primary shadow-soft hover:shadow-glow hover:scale-105 transition-all duration-300"
				on:click={closeModal}
			>
				{$t('content.close')}
			</button>
		</div>
	</div>
</div>
