import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (user) {
		if (user.role === 'ADMIN') {
			redirect(301, '/dashboard/admin');
		}
		if (user.role === 'PASSENGER') {
			redirect(301, '/dashboard/profile');
		}
	} else {
		redirect(301, 'auth/login');
	}
};
