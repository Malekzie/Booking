<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { User } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="outline">
			<User class="h-6 w-6" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item>
			<Button variant="link" href="/auth/login" size="sm">Login</Button>
		</DropdownMenu.Item>
		<DropdownMenu.Item>Register</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
