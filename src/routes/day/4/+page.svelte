<script lang="ts">
	import axios from 'axios';
	import { Heart } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let heartRate = $state(100);
	let pulseOvertime: number[] = $state([]);
	let heart: HTMLDivElement | null = $state(null);

	onMount(() => {
		const interval = setInterval(async () => {
			heartRate = await axios
				.get('https://advent.sveltesociety.dev/data/2023/day-four.json')
				.then((res) => res.data.heartRate);
			heart?.animate(
				[{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }],
				{
					duration: (60 / heartRate) * 1000,
					iterations: (60 / heartRate) * 60,
					easing: 'ease-in-out'
				}
			);
			// Add the current heart rate to the array of heart rates for a max of 60
			pulseOvertime = [...pulseOvertime, heartRate].slice(-60);
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<section class="flex h-full flex-col">
	<h2 class="text-3xl font-bold">Day 4 - Heart of Christmas</h2>
	<article class="grid my-auto space-y-20 grid-cols-3">
		<h2 class="col-span-full text-center text-6xl">SHRM™ (Santa's Heart Rate Monitor)</h2>
        <div class="text-6xl font-bold text-center">
            <p class="text-5xl">
                Average heart rate:
            </p>
            <p>
                {Math.round(pulseOvertime.reduce((a, b) => a + b, 0) / pulseOvertime.length)}
            </p>
        </div>
		<div class="heart relative size-64 mx-auto" bind:this={heart}>
			<Heart class="absolute inset-0 size-full fill-red-600 stroke-black stroke-1" />
			<p class="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white">
				{heartRate}
			</p>
		</div>
		<div class="relative flex h-fit w-[400px] items-center justify-center">
			<div class="absolute -left-6 h-full text-xs text-white">
				<ul class="flex h-full flex-col-reverse justify-evenly text-right">
					{#each Array(14) as _, i}
						<li class="">{i * 10}</li>
					{/each}
				</ul>
			</div>
			<div class="absolute -bottom-4 right-0 w-[400px]">
				<ul class="flex w-full justify-between text-xs text-white">
					{#each Array(16) as _, i}
						<li class="">{i * 4}</li>
					{/each}
				</ul>
			</div>
			<!-- Create a pulse chart that displays the latest 60 pulses in pulseOverTime -->
			<svg class="aspect-video w-full" viewBox="0 0 232 131" fill="none">
				<!-- X axis -->
				<path d="M 0 130 L 231 130" stroke="black" stroke-width="2" />
				<!-- Y axis -->
				<path d="M 0 0 L 0 130" stroke="black" stroke-width="2" />
				<!-- A line in the Y axis every 10 -->
				{#each Array(13) as _, i}
					<path d="M 0 {i * 10} L 231 {i * 10}" stroke="black" stroke-width="1" />
				{/each}
				<!-- Pulse -->
				{#each pulseOvertime as pulse, i}
					<!-- <path d="M {} {130 - pulse} L {} {130 - pulseOvertime[Math.min(Math.max(i -1, 0), 60)]}" stroke="red" stroke-width="2" /> -->
					<path
						d="M {i * 4} {130 - pulse} L {(i - 1) * 4} {130 -
							pulseOvertime[Math.min(Math.max(i - 1, 0), 60)]}"
						stroke="red"
						stroke-width="2"
					/>
				{/each}
			</svg>
		</div>
	</article>
</section>

<style lang="postcss">
</style>
