import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const path = event.url.pathname;

	const hideLayout = path.startsWith('/dashboard/admin');
	return {
		session: event.locals.session,
		user: event.locals.user,
		hideLayout
	};
};
