<style>
	.cube-container {
		width: var(--size);
		height: var(--size);
		perspective: 400px;
		margin: 0 auto;
	}

	.cube {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transform: rotateX(-25deg) rotateY(-35deg);
		animation: gentle-rotate 8s ease-in-out infinite;
	}

	@keyframes gentle-rotate {
		0%,
		100% {
			transform: rotateX(-25deg) rotateY(-35deg);
		}
		50% {
			transform: rotateX(-30deg) rotateY(-45deg);
		}
	}

	.face {
		position: absolute;
		width: var(--size);
		height: var(--size);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2px;
		padding: 3px;
		background: #1a1a1a;
		border-radius: 6px;
		box-sizing: border-box;
	}

	.front {
		transform: translateZ(calc(var(--size) / 2));
	}

	.right {
		transform: rotateY(90deg) translateZ(calc(var(--size) / 2));
	}

	.top {
		transform: rotateX(90deg) translateZ(calc(var(--size) / 2));
	}

	.sticker {
		border-radius: 3px;
		box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
	}

	.red {
		background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
	}

	.blue {
		background: linear-gradient(135deg, #4488ff 0%, #0044cc 100%);
	}

	.white {
		background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
	}
</style>

<script lang="ts">
	export let size: number = 80;
</script>

<div class="cube-container" style="--size: {size}px">
	<div class="cube">
		<div class="face front">
			<div class="sticker red"></div>
			<div class="sticker red"></div>
			<div class="sticker red"></div>
			<div class="sticker red"></div>
			<div class="sticker red"></div>
			<div class="sticker red"></div>
			<div class="sticker red"></div>
			<div class="sticker red"></div>
			<div class="sticker red"></div>
		</div>
		<div class="face right">
			<div class="sticker blue"></div>
			<div class="sticker blue"></div>
			<div class="sticker blue"></div>
			<div class="sticker blue"></div>
			<div class="sticker blue"></div>
			<div class="sticker blue"></div>
			<div class="sticker blue"></div>
			<div class="sticker blue"></div>
			<div class="sticker blue"></div>
		</div>
		<div class="face top">
			<div class="sticker white"></div>
			<div class="sticker white"></div>
			<div class="sticker white"></div>
			<div class="sticker white"></div>
			<div class="sticker white"></div>
			<div class="sticker white"></div>
			<div class="sticker white"></div>
			<div class="sticker white"></div>
			<div class="sticker white"></div>
		</div>
	</div>
</div>
