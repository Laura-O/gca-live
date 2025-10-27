<script lang="ts">
	import { t } from '$lib/translations';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeClasses = {
		sm: 'loading-sm',
		md: 'loading-md',
		lg: 'loading-lg'
	};
</script>

<div class="flex flex-col items-center justify-center p-8">
	<span class={`loading loading-spinner ${sizeClasses[size]}`}></span>
	<p class="mt-4 text-base-content">{$t('content.loading')}</p>
</div>
