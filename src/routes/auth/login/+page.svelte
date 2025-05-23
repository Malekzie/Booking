<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from '$lib/components/login-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<div
	class=" flex h-[89vh] max-h-screen flex-col items-center justify-center rounded-lg bg-[url(/login-bg.jpg)] bg-cover bg-center p-6 md:p-10"
>
	<div class="w-full max-w-sm md:max-w-3xl">
		<LoginForm />
	</div>
</div>
