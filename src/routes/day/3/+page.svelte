<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
    import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	import Sleigh from '$lib/img/Sleigh.png';
	import Presents_1 from '$lib/img/Presents_1.png';
	import Presents_2 from '$lib/img/Presents_2.png';
	import Presents_3 from '$lib/img/Presents_3.png';

	export let data: PageData;
	const list: Writable<{ name: string; weight: number }[]> = writable(data.data);
    const pouch: Writable<{ name: string; weight: number }[]> = writable([]);
	const procent = writable(0);

    function addToPouch(index: number) {
        pouch.update((value) => {
            value.push($list[index]);
            return value;
        });
        procent.update((value) => {
            return value + $list[index].weight;
        });
        list.update((value) => {
            value.splice(index, 1);
            return value;
        });
    }

    function removeFromPouch(index: number) {
        list.update((value) => {
            value.push($pouch[index]);
            return value;
        });
        procent.update((value) => {
            return value - $pouch[index].weight;
        });
        pouch.update((value) => {
            value.splice(index, 1);
            return value;
        });
    }

    function launchSleigh() {
        const sleigh = document.getElementById('Sleigh');
        setTimeout(() => {
            pouch.set([]);
            procent.set(0);
        }, 1900)
        sleigh?.animate(
            [
                { transform: 'translateX(0) translateY(0)' },
                { transform: 'translateX(0) translateY(-80%)' },
                { transform: 'translateX(300%) translateY(-80%)' },
                { transform: 'translateX(300%) translateY(-80%)'},
            ],
            {
                duration: 2000,
                iterations: 1,
            }
        );
        
    }
</script>

<section class="flex h-full flex-col">
	<h2 class="text-3xl font-bold">Day 3 - Jingle Bell Balancer</h2>
	<article class="grid grow grid-cols-5 overflow-x-hidden">
		<div class="col-span-2 p-4 h-[calc(100vh-7rem)] overflow-y-auto flex align-top flex-wrap gap-2 scroolbar scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-900 dark:scrollbar-thumb-slate-500">
            {#each $list as item, index}
                <button disabled={(100-$procent)<item.weight} on:click={() => addToPouch(index)} class="flex border bg-slate-100 dark:bg-slate-900 rounded-lg p-2 h-fit disabled:opacity-25">
                    <p>{item.name} | {item.weight}kg</p>
                </button>
            {/each}
        </div>
        <div class="col-span-1 p-4 max-h-[calc(100vh-7rem)] justify-center align-top space-y-2 overflow-y-auto scroolbar scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-900 dark:scrollbar-thumb-slate-500">
            {#each $pouch as item, index}
                <button on:click={() => removeFromPouch(index)} class="flex border bg-slate-100 dark:bg-slate-900 rounded-lg p-2 w-fit mx-auto h-fit">
                    <p>{item.name} | {item.weight}kg</p>
                </button>
            {/each}
        </div>
		<div class="m-auto col-span-2 flex flex-col justify-center">
            <h2 class="text-4xl font-bold text-center">{($procent).toFixed(2)}kg / 100kg</h2>
            <div class="relative size-96 z-50" id="Sleigh">
                <img src={Sleigh} alt="" class="" />
                {#if $procent > 10}
                    <img src={Presents_1} class="absolute top-0" alt="" />
                {/if}
                {#if $procent > 50}
                    <img src={Presents_2} class="absolute top-0" alt="" />
                {/if}
                {#if $procent > 90}
                    <img src={Presents_3} class="absolute top-0" alt="" />
                {/if}
            </div>
            <Button on:click={launchSleigh} class="bg-red-600 hover:bg-red-800 text-white font-bold">Launch Sleigh</Button>
        </div>
	</article>
</section>
