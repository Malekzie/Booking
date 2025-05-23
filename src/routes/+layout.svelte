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
	<div class="my-2 flex">
		<div class="mx-5 flex gap-3">
			<div class="bg-muted rounded-lg">
				<img src="/logo.png" alt="Logo" class="h-15 w-15 rounded-lg" />
			</div>
			<span class="font-semibold">Travel Experts</span>
		</div>
		<NavBar />
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
