import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').Actions} */

export const actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const search = form.get('search');
    // const network = form.get('network');

    throw redirect(307, `/assets/${search}`);
  },
};
