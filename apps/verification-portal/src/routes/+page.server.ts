import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    throw redirect(307, `/${data.get('search')}`);
  },
};
