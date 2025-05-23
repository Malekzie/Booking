<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { cn } from '$lib/utils.js';
	import { registerSchema, type RegisterSchema } from '$lib/schemas/userSchema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { LoaderIcon } from 'lucide-svelte';

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
	const { form: formData, enhance, submitting } = form;
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
							{#snippet children({ props })}
								<Form.Label>Username</Form.Label>
								<Input
									{...props}
									type="text"
									placeholder="Your username"
									bind:value={$formData.username}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input
									{...props}
									type="text"
									placeholder="m@email.com"
									bind:value={$formData.email}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input {...props} type="password" bind:value={$formData.password} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="confirmPassword">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Confirm Password</Form.Label>
								<Input {...props} type="password" bind:value={$formData.confirmPassword} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					{#if $submitting}
						<Form.Button class="w-full" disabled>
							<div class="invalid flex items-center gap-5">
								<LoaderIcon class="animate-spin" />
								<span>Signing up</span>
							</div>
						</Form.Button>
					{:else}
						<Form.Button class="w-full">
							<span class="font-semibold"> Register </span>
						</Form.Button>
					{/if}
					<div class="mb-5 text-center text-sm">
						Already have an account?
						<a href="/auth/login" class="underline underline-offset-4"> Login </a>
					</div>
				</div>
			</form>
			<div class="bg-muted relative hidden md:block">
				<img
					src="/register.jpg"
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
