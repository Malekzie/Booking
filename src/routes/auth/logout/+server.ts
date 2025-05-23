// src/routes/auth/logout/+server.ts
import { invalidateSession } from '$lib/services/authApi';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	const session = event.locals.session;

	if (session) {
		await invalidateSession(session.id);
	}

	// Redirect to login or homepage after logout
	throw redirect(303, '/');
};
