<script lang="ts">
	import Nav from '$lib/components/svelte/Nav.svelte';

	import '../app.css';

	import { Separator } from '$lib/components/ui/separator/index.js';

	let { children } = $props();
</script>

<main class="h-auto w-full">
	<Nav />
	<Separator />
	<div class="m-4 rounded-lg bg-white p-2 text-black">
		{@render children?.()}
	</div>
</main>
