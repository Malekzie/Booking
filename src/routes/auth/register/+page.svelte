<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import RegisterForm from '$lib/components/register-form.svelte';
</script>

<div
	class=" flex h-[89vh] max-h-screen flex-col items-center justify-center rounded-lg bg-[url(/register-bg.jpg)] bg-cover bg-center p-6 md:p-10"
>
	<div class="w-full max-w-sm md:max-w-3xl">
		<RegisterForm {data} />
	</div>
</div>
