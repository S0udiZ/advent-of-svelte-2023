<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon, Menu } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';

	let open: Boolean = $state(false);
</script>

<ModeWatcher />
<main class="flex h-dvh">
	<div
		class="flex h-dvh w-0 flex-col overflow-hidden font-mono transition-all duration-300 ease-in-out"
		class:active={open}
	>
		<h2 class="font-bold p-0.5 text-center text-3xl my-2">Days</h2>
		<hr class="border-t-2" />

		<ol
			class="scrollbar-rounded-full grow overflow-y-scroll p-2 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-900 dark:scrollbar-thumb-slate-500"
		>
			{#each { length: 1 } as _, index}
				<li>
					<a href="/day/{index + 1}" class="block p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
						Day {index + 1}
					</a>
				</li>
			{/each}
		</ol>
	</div>
	<div class="grow border-x-2 flex flex-col">
		<header class="flex justify-between border-b-2 p-2">
			<Button on:click={() => (open = !open)} variant="outline" size="icon">
				<Menu class="size-[1.2rem]" />
			</Button>
			<a href="/" class="hover:scale-110"
				><h1 class="font-bold glow font-mono text-3xl">Advent Of Svelte 2023</h1></a
			>
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun class="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon
					class="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</header>
		<div class="p-2 grow">
			<slot />
		</div>
	</div>
</main>

<style lang="postcss">
	.active {
		@apply w-60;
	}
	.glow:hover {
		animation: glow 2s infinite;
	}
	@keyframes glow {
		0% {
			text-shadow:
				0 0 10px #00ff00,
				0 0 20px #00ff00,
				0 0 30px #00ff00,
				0 0 40px #00ff00;
		}
		50% {
			text-shadow:
				0 0 10px #ff0000,
				0 0 20px #ff0000,
				0 0 30px #ff0000,
				0 0 40px #ff0000;
		}
		100% {
			text-shadow:
				0 0 10px #00ff00,
				0 0 20px #00ff00,
				0 0 30px #00ff00,
				0 0 40px #00ff00;
		}
	}
</style>
