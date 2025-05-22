<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Inbox, House, Calendar, Search, Settings, User } from 'lucide-svelte';

	const menuItems = [
		{
			title: 'Home',
			url: '#',
			icon: House
		},
		{
			title: 'Inbox',
			url: '#',
			icon: Inbox
		},
		{
			title: 'Calendar',
			url: '#',
			icon: Calendar
		},
		{
			title: 'Search',
			url: '#',
			icon: Search
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings
		}
	];
</script>

<nav class="m-2 flex h-10 items-center space-x-4">
	<div
		class="flex h-10 w-32 items-center justify-center rounded border border-gray-300 bg-gray-100 text-lg font-bold text-gray-600"
	>
		Logo here
	</div>

	<div class="flex items-center justify-between gap-4">
		{#each menuItems as item (item.title)}
			<Button variant="ghost" href={item.url} class="flex items-center gap-2">
				{@const Icon = item.icon}
				<Icon class="h-4 w-4" />
				<span>{item.title}</span>
			</Button>
		{/each}
	</div>
	<div class="ml-auto flex">
		<Button variant="ghost" class="flex items-center gap-2">
			<span>Login</span>
		</Button>
		<Button variant="ghost" class="flex items-center gap-2">
			<span>Register</span>
		</Button>
	</div>
</nav>
