<script lang="ts">
	import AuthButtons from './oAuth.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { cn } from '$lib/utils.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema, type LoginSchema } from '$lib/schemas/userSchema';
	import { LoaderIcon } from 'lucide-svelte';

	let {
		data,
		class: className = '',
		...restProps
	}: {
		class?: string;
		data: { form: SuperValidated<Infer<LoginSchema>> };
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});
	const { form: formData, enhance, submitting } = form;
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root class="overflow-hidden p-0">
		<Card.Content class="grid p-0 md:grid-cols-2">
			<form class="p-6 md:p-8" method="POST" use:enhance>
				<div class="flex flex-col gap-6">
					<div class="flex flex-col items-center text-center">
						<h1 class="text-2xl font-bold">Welcome back</h1>
						<p class="text-muted-foreground text-balance">Login to your Acme Inc account</p>
					</div>
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input
									{...props}
									type="text"
									placeholder="h@email.com"
									bind:value={$formData.email}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<div class="flex items-center">
									<Form.Label>Password</Form.Label>
									<a href="##" class="ml-auto text-sm underline-offset-2 hover:underline">
										Forgot your password?
									</a>
								</div>
								<Input {...props} type="password" bind:value={$formData.password} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					{#if $submitting}
						<Form.Button class="w-full" disabled>
							<div class="invalid flex items-center gap-5">
								<LoaderIcon class="animate-spin" />
								<span>Logging In</span>
							</div>
						</Form.Button>
					{:else}
						<Form.Button class="w-full">
							<span class="font-semibold"> Login </span>
						</Form.Button>
					{/if}
					<div
						class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
					>
						<span class="bg-card text-muted-foreground relative z-10 px-2"> Or continue with </span>
					</div>
					<AuthButtons />
					<div class="text-center text-sm">
						Don&apos;t have an account?
						<a href="/auth/register" class="underline underline-offset-4"> Sign up </a>
					</div>
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
		By clicking continue, you agree to our <a href="##">Terms of Service</a> and
		<a href="##">Privacy Policy</a>.
	</div>
</div>
