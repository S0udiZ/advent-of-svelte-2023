<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { writable, type Writable } from 'svelte/store';

	export let data: PageData;
	let tallyList = data.data;
	let childName = '';
	let childData: Writable<ChildData> = writable();
	type ChildData = {
		name: string;
		naughty: boolean;
		nice: boolean;
	};

	function searchChild() {
		const child = tallyList.find((child: any) => child.name.toLowerCase() === childName.toLowerCase());
		if (child) {
			if (child.tally > 0) {
				childData.set({ name: child.name, naughty: false, nice: true });
			} else {
				childData.set({ name: child.name, naughty: true, nice: false });
			}
		} else {
			childData.set({ name: 'Child not found', naughty: false, nice: false });
		}
	}
</script>

<section class="h-full">
	<h2 class="text-3xl font-bold">Day 1 - Naughty or Nice</h2>
	<article class="flex flex-col items-center h-5/6 gap-2">
		<form on:submit|preventDefault={searchChild} class="flex gap-2">
			<Input placeholder="Enter child name" bind:value={childName} />
			<Button on:click={searchChild}>Search</Button>
		</form>
		<div class="border-2 text-7xl grow min-w-[50%] max-w-[100%] flex justify-center items-center rounded-xl font-bold uppercase">
			{#if $childData}
				{#if $childData.naughty}
					<p class="text-red-600 naughty-glow">naughty</p>
				{:else if $childData.nice}
					<p class="text-green-500 nice-glow">nice</p>
				{:else}
					<p>{$childData.name}</p>
				{/if}
			{/if}
		</div>
	</article>
</section>

<style lang="postcss">
    .naughty-glow {
        animation: naughty-glow 2s infinite;
    }
    .nice-glow {
        animation: nice-glow 2s infinite;
    }
    @keyframes naughty-glow {
        0% {
            text-shadow: 0 0 10px #ff0000;
        }
        50% {
            text-shadow: 0 0 20px #ff0000;
        }
        100% {
            text-shadow: 0 0 10px #ff0000;
        }
    }
    @keyframes nice-glow {
        0% {
            text-shadow: 0 0 10px #00ff00;
        }
        50% {
            text-shadow: 0 0 20px #00ff00;
        }
        100% {
            text-shadow: 0 0 10px #00ff00;
        }
    }
</style>