<!-- src/lib/components/Toast.svelte -->
<script lang="ts">
	import { toasts } from '$lib/stores/toast';
	import { fly } from 'svelte/transition';

	const alertClasses = {
		success: 'alert-success',
		error: 'alert-error',
		info: 'alert-info',
		warning: 'alert-warning'
	};
</script>

<div class="toast toast-top toast-end z-toast">
	{#each $toasts as toast (toast.id)}
		<div
			class="alert {alertClasses[toast.type]} shadow-lg"
			transition:fly={{ x: 300, duration: 300 }}
			role="alert"
		>
			<div class="flex items-center justify-between w-full">
				<span>{toast.message}</span>
				<button
					class="btn btn-sm btn-ghost btn-circle"
					on:click={() => toasts.dismiss(toast.id)}
					aria-label="Dismiss notification"
				>
					✕
				</button>
			</div>
		</div>
	{/each}
</div>
