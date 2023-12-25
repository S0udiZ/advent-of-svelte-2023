<script lang="ts">
	import { Badge, Plus, Minus, RotateCcw } from 'lucide-svelte';

	let cookieCount: number = $state(0);
	let totalCookieCount: number = $state(0);
	let plusButton: HTMLButtonElement | undefined = $state();
	let minusButton: HTMLButtonElement | undefined = $state();
	let resetButton: HTMLButtonElement | undefined = $state();

	function plusCookie() {
		cookieCount++;
		if (cookieCount > totalCookieCount) {
			totalCookieCount = cookieCount;
		}
		plusButton?.animate(
			[
				{ transform: 'translateY(0)' },
				{ transform: 'translateY(-20px)' },
				{ transform: 'translateY(0)' }
			],
			{
				duration: 200,
				easing: 'ease-in-out'
			}
		);
	}

	function minusCookie() {
		cookieCount--;
		minusButton?.animate(
			[
				{ transform: 'translateY(0)' },
				{ transform: 'translateY(-20px)' },
				{ transform: 'translateY(0)' }
			],
			{
				duration: 200,
				easing: 'ease-in-out'
			}
		);
	}

	function resetCookie() {
		cookieCount = 0;
		totalCookieCount = 0;
		resetButton?.animate(
			[{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }, { transform: 'rotate(0)' }],
			{
				duration: 300,
				easing: 'ease-in-out'
			}
		);
	}
</script>

<section class="flex h-full flex-col">
	<h2 class="text-3xl font-bold">Day 2 - Merry Munch-o-Meter</h2>
	<article class="grid grow grid-cols-3 items-center">
		<div class="relative mx-auto flex h-48 w-64 justify-center overflow-hidden">
			<h3 class="text-center font-mono text-4xl font-bold">Jolly'o'Meter</h3>
			<div
				class="gauge-border absolute -bottom-2/3 size-64 translate-y-px -rotate-[90deg] rounded-full"
			/>
			<div class="absolute -bottom-2/3 h-52 w-44 translate-y-px rounded-full bg-background" />
			<div class="absolute bottom-0 left-0 w-1/2 origin-right rounded-full border-4 border-white transition-transform ease-in-out duration-200" style={
				`transform: rotate(${Math.min(Math.max((cookieCount / totalCookieCount) * 180, 0), 180)}deg);`
			} />
		</div>
		<div class="flex h-5/6 flex-col items-center justify-center gap-2">
			<h2 class="font-mono text-7xl font-bold">{cookieCount}</h2>
			<div class="flex gap-6">
				<button
					on:click={plusCookie}
					bind:this={plusButton}
					class="relative size-44 rounded-full border-8 border-[#7b3d11]/50 bg-[#ffdead] hover:scale-110"
				>
					<Badge class="absolute inset-0 m-auto size-full text-[#52280b]" />
					<Plus class="absolute inset-0 m-auto size-9/12 text-green-500" />
				</button>
				<button
					on:click={resetCookie}
					bind:this={resetButton}
					class="relative size-44 rounded-full border-8 border-[#7b3d11]/50 bg-[#ffdead] hover:scale-110"
				>
					<Badge class="absolute inset-0 m-auto size-full text-[#52280b]" />
					<RotateCcw class="absolute inset-0 m-auto size-7/12 text-yellow-500" />
				</button>
				<button
					on:click={minusCookie}
					bind:this={minusButton}
					class="relative size-44 rounded-full border-8 border-[#7b3d11]/50 bg-[#ffdead] hover:scale-110"
				>
					<Badge class="absolute inset-0 m-auto size-full text-[#52280b]" />
					<Minus class="absolute inset-0 m-auto size-9/12 text-red-500" />
				</button>
			</div>
		</div>
		<div class="relative mx-auto flex h-48 w-64 justify-center overflow-hidden">
			<h3 class="text-center font-mono text-4xl font-bold">Jolly'o'Meter</h3>
			<div
				class="gauge-border absolute -bottom-2/3 size-64 translate-y-px -rotate-[90deg] rounded-full"
			/>
			<div class="absolute -bottom-2/3 h-52 w-44 translate-y-px rounded-full bg-background" />
			<div class="absolute bottom-0 left-0 w-1/2 origin-right rounded-full border-4 border-white transition-transform ease-in-out duration-200" style={
				`transform: rotate(${Math.min(Math.max((cookieCount / totalCookieCount) * 180, 0), 180)}deg);`
			} />
		</div>
	</article>
</section>

<style lang="postcss">
	.gauge-border {
		background: conic-gradient(red 55deg, yellow 55deg 125deg, green 125deg 180deg);
	}
</style>
