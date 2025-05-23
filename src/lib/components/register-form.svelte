<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { cn } from '$lib/utils.js';
	import { registerSchema, type RegisterSchema } from '$lib/schemas/userSchema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let {
		data,
		class: className = '',
		...restProps
	}: {
		class?: string;
		data: { form: SuperValidated<Infer<RegisterSchema>> };
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(registerSchema)
	});
	const { form: formData, enhance } = form;
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root class="overflow-hidden p-0">
		<Card.Content class="grid p-0 md:grid-cols-2">
			<form method="POST" use:enhance class="p-6 md:p-8">
				<div class="flex flex-col gap-6">
					<div class="flex flex-col items-center text-center">
						<h1 class="text-2xl font-bold">New here?</h1>
						<p class="text-muted-foreground text-balance">Register to an Acme Inc account</p>
					</div>
					<Form.Field {form} name="username">
						<Form.Control>
							<Form.Label>Username</Form.Label>
							<Input
								type="text"
								placeholder="Your username"
								bind:value={$formData.username}
								required
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="email">
						<Form.Control>
							<Form.Label>Email</Form.Label>
							<Input
								type="email"
								placeholder="m@example.com"
								bind:value={$formData.email}
								required
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password">
						<Form.Control>
							<Form.Label>Password</Form.Label>
							<Input type="password" bind:value={$formData.password} required />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password">
						<Form.Control>
							<Form.Label>Password</Form.Label>
							<Input type="password" bind:value={$formData.password} required />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="confirmPassword">
						<Form.Control>
							<Form.Label>Confirm Password</Form.Label>
							<Input type="password" bind:value={$formData.confirmPassword} required />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Button class="w-full">Register</Form.Button>
				</div>
			</form>
			<div class="bg-muted relative hidden md:block">
				<img
					src="/login.jpg"
					alt="placeholder"
					class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</Card.Content>
	</Card.Root>
	<div
		class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
	>
		By clicking register, you agree to our <a href="##">Terms of Service</a> and
		<a href="##">Privacy Policy</a>.
	</div>
</div>
