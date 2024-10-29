<script lang="ts">
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	export let url: string; // URL to encode in the QR code
	let qrCodeDataUrl: string | undefined;

	// Generate the QR code when the URL changes
	$: if (url) {
		QRCode.toDataURL(url, { errorCorrectionLevel: 'H' })
			.then((dataUrl: string) => {
				qrCodeDataUrl = dataUrl;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	// Function to download the QR code as a PNG file
	function downloadQRCode() {
		if (qrCodeDataUrl) {
			const link = document.createElement('a');
			link.href = qrCodeDataUrl; // Data URL for the QR code
			link.download = 'qrcode.png'; // Set the file name
			document.body.appendChild(link);
			link.click(); // Programmatically click the link to trigger the download
			document.body.removeChild(link); // Clean up
		}
	}
</script>

<div>
	{#if qrCodeDataUrl}
		<img src="{qrCodeDataUrl}" alt="QR Code" />
		<button on:click="{downloadQRCode}">Download QR Code as PNG</button>
	{:else}
		<p>Generating QR Code...</p>
	{/if}
</div>
