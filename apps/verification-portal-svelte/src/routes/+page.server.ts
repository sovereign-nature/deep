import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();

		throw redirect(307, `/${data.get('search')}`);
	}
};
