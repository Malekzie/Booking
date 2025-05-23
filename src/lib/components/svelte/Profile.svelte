<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { User } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let { data } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="outline">
			<User class="h-6 w-6" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#if data.user}
			<DropdownMenu.Item>
				<Button variant="ghost" href="/dashboard" size="sm" class="w-full">Profile</Button>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Button variant="ghost" href="/auth/register" size="sm" class="w-full">Logout</Button>
			</DropdownMenu.Item>
		{:else}
			<DropdownMenu.Item>
				<Button variant="ghost" href="/auth/login" size="sm" class="w-full">Login</Button>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Button variant="ghost" href="/auth/register" size="sm" class="w-full">Register</Button>
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
