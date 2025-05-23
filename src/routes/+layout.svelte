<script lang="ts">
	import NavBar from '$lib/components/svelte/NavBar.svelte';
	import { ModeWatcher } from 'mode-watcher';

	import '../app.css';

	import { Separator } from '$lib/components/ui/separator/index.js';
	import Profile from '$lib/components/svelte/Profile.svelte';
	import DarkMode from '$lib/components/svelte/darkMode.svelte';

	let { children } = $props();
</script>

<ModeWatcher />

<main class="h-auto w-full">
	<div class="my-2 flex items-center gap-x-6">
		<!-- Logo and Title -->
		<div class="flex items-center gap-x-3 px-2">
			<a
				href="/"
				class="bg-muted hover:bg-muted/70 flex items-center gap-x-3 rounded-lg px-3 py-2 transition"
			>
				<img src="/logo.png" alt="Logo" class="h-12 w-12 rounded-lg object-contain" />
				<span class="mr-2 text-xl font-semibold whitespace-nowrap">Travel Experts</span>
			</a>
		</div>

		<!-- NavBar centered in available space -->
		<div class="flex flex-1 justify-center">
			<NavBar />
		</div>

		<!-- Profile and DarkMode -->
		<div class="mx-5 flex items-center gap-5">
			<DarkMode />
			<Profile />
		</div>
	</div>
	<Separator />
	<div class="m-4 rounded-lg">
		{@render children?.()}
	</div>
</main>
