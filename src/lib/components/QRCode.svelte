<script lang="ts">
	import QRCode from 'qrcode';
	import { browser } from '$app/environment';
	import { toasts } from '$lib/stores/toast';
	import { t } from '$lib/translations';

	export let url: string; // URL to encode in the QR code
	let qrCodeDataUrl: string | undefined;
	let hasError = false;

	// Generate the QR code when the URL changes (only in browser)
	$: if (browser && url) {
		QRCode.toDataURL(url, {
			errorCorrectionLevel: 'H',
			margin: 2,
			color: {
				dark: '#000000',
				light: '#ffffff'
			}
		})
			.then((dataUrl: string) => {
				qrCodeDataUrl = dataUrl;
				hasError = false;
			})
			.catch((_err) => {
				// In production, you might want to send this to an error tracking service
				// like Sentry or LogRocket
				hasError = true;
				qrCodeDataUrl = undefined;
			});
	}

	// Function to download the QR code as a PNG file
	function downloadQRCode() {
		if (browser && qrCodeDataUrl) {
			const link = document.createElement('a');
			link.href = qrCodeDataUrl; // Data URL for the QR code
			link.download = 'qrcode.png'; // Set the file name
			document.body.appendChild(link);
			link.click(); // Programmatically click the link to trigger the download
			document.body.removeChild(link); // Clean up
			toasts.show(
				$t('content.qr-downloaded') || 'QR code downloaded successfully!',
				'success'
			);
		}
	}
</script>

<div class="flex flex-col items-center gap-4">
	{#if hasError}
		<div class="alert alert-error">
			<span>Failed to generate QR code. Please try again later.</span>
		</div>
	{:else if qrCodeDataUrl}
		<div
			class="rounded-lg overflow-hidden border-2 border-neutral-300 dark:border-neutral-600"
		>
			<img src={qrCodeDataUrl} alt="QR Code" class="w-48 h-48 bg-white" />
		</div>
		<p class="text-xs text-base-content/50 break-all max-w-48 text-center">
			{url}
		</p>
		<button class="btn btn-primary gap-2" on:click={downloadQRCode}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-5 h-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
				></path>
			</svg>
			Download
		</button>
	{:else}
		<p>Generating QR Code...</p>
	{/if}
</div>
