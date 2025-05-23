import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas/userSchema';
import { UserService } from '$lib/services/userService';
import { verifyPasswordHash } from '$lib/utils/password.util';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/services/authApi';

const userService = new UserService();
export const load: PageServerLoad = async (event) => {
	// Check if user is already logged in and redirects to home page
	if (event.locals.session !== null && event.locals.user !== null) {
		return redirect(302, '/');
	}
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// Check if user exists
		const user = await userService.getUserByEmail(form.data.email);
		if (!user) {
			return setError(form, 'email', 'Invalid email or password');
		}

		// Check if password is correct
		const isPasswordValid = await verifyPasswordHash(user.password, form.data.password);
		if (!isPasswordValid) {
			return setError(form, 'password', 'Invalid email or password');
		}

		// Create session
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/dashboard');
	}
};
