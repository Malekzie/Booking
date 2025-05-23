import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '$lib/schemas/userSchema';
import { fail, redirect } from '@sveltejs/kit';
import { UserService } from '$lib/services/userService';
import { createSession, generateSessionToken } from '$lib/services/authApi';

const userService = new UserService();

export const load: PageServerLoad = async (event) => {
	// Check if user is already logged in and redirects to home page
	if (event.locals.session !== null && event.locals.user !== null) {
		return redirect(302, '/');
	}
	return {
		form: await superValidate(zod(registerSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// Check if user already exists
		const existingUser = await userService.getUserByEmail(form.data.email);

		if (existingUser) {
			return setError(form, 'email', 'Email already exists');
		}

		// Check if username already exists
		const existingUsername = await userService.getUserByUsername(form.data.username);
		if (existingUsername) {
			return setError(form, 'username', 'Username already exists');
		}

		// Create new user
		const newUser = await userService.createUser({
			email: form.data.email,
			username: form.data.username,
			password: form.data.password
		});

		if (!newUser) {
			return fail(500, {
				form,
				message: 'Failed to create user. Please try again.'
			});
		}

		const token = generateSessionToken();
		await createSession(token, newUser.id);
		throw redirect(302, '/auth/login');
	}
};
