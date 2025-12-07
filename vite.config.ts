import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'production',
			strategies: 'generateSW',
			scope: '/',
			base: '/',
			manifest: {
				name: 'GCA Live - German Cube Association',
				short_name: 'GCA Live',
				description:
					"View live Rubik's Cube competitions in Germany. Get real-time updates, schedules, and competition information.",
				theme_color: '#10b981',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				icons: [
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: '/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,webp,ico,json,woff,woff2}'],
				runtimeCaching: [
					{
						urlPattern:
							/^https:\/\/raw\.githubusercontent\.com\/robiningelbrecht\/wca-rest-api\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'wca-api-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 5 // 5 minutes
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			},
			devOptions: {
				enabled: false,
				type: 'module'
			}
		}),
		visualizer({
			filename: './stats.html',
			open: false,
			gzipSize: true,
			brotliSize: true
		})
	]
});
