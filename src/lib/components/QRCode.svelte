<script lang="ts">
	import QRCode from 'qrcode';
	import { browser } from '$app/environment';

	export let url: string; // URL to encode in the QR code
	let qrCodeDataUrl: string | undefined;

	// Generate the QR code when the URL changes (only in browser)
	$: if (browser && url) {
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
		if (browser && qrCodeDataUrl) {
			const link = document.createElement('a');
			link.href = qrCodeDataUrl; // Data URL for the QR code
			link.download = 'qrcode.png'; // Set the file name
			document.body.appendChild(link);
			link.click(); // Programmatically click the link to trigger the download
			document.body.removeChild(link); // Clean up
		}
	}
</script>

<div class="flex flex-col items-center">
	{#if qrCodeDataUrl}
		<img src={qrCodeDataUrl} alt="QR Code" />
		<button class="btn" on:click={downloadQRCode}>Download PNG</button>
	{:else}
		<p>Generating QR Code...</p>
	{/if}
</div>
