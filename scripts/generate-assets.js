#!/usr/bin/env node

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const inputLogo = join(projectRoot, 'src/lib/assets/logo.png');
const outputDir = join(projectRoot, 'static');

// Ensure static directory exists
if (!existsSync(outputDir)) {
	mkdirSync(outputDir, { recursive: true });
}

async function generateAssets() {
	console.log('🎨 Generating optimized assets...\n');

	try {
		// Convert logo to WebP
		console.log('📦 Converting logo to WebP...');
		await sharp(inputLogo)
			.webp({ quality: 90 })
			.toFile(join(outputDir, 'logo.webp'));
		console.log('✓ Created logo.webp');

		// Copy original PNG as fallback
		await sharp(inputLogo).toFile(join(outputDir, 'logo.png'));
		console.log('✓ Created logo.png (fallback)');

		// Generate PWA icons
		const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

		console.log('\n📱 Generating PWA icons...');
		for (const size of iconSizes) {
			await sharp(inputLogo)
				.resize(size, size, {
					fit: 'contain',
					background: { r: 255, g: 255, b: 255, alpha: 1 }
				})
				.png()
				.toFile(join(outputDir, `icon-${size}x${size}.png`));
			console.log(`✓ Created icon-${size}x${size}.png`);
		}

		// Generate Apple Touch Icon
		console.log('\n🍎 Generating Apple Touch Icon...');
		await sharp(inputLogo)
			.resize(180, 180, {
				fit: 'contain',
				background: { r: 255, g: 255, b: 255, alpha: 1 }
			})
			.png()
			.toFile(join(outputDir, 'apple-touch-icon.png'));
		console.log('✓ Created apple-touch-icon.png');

		// Generate favicon
		console.log('\n⭐ Generating favicon...');
		await sharp(inputLogo)
			.resize(32, 32, {
				fit: 'contain',
				background: { r: 255, g: 255, b: 255, alpha: 1 }
			})
			.png()
			.toFile(join(outputDir, 'favicon.png'));
		console.log('✓ Created favicon.png');

		console.log('\n✨ All assets generated successfully!');
	} catch (error) {
		console.error('❌ Error generating assets:', error);
		process.exit(1);
	}
}

generateAssets();
