import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  if (!url.searchParams.has('dev')) {
    redirect(302, '/');
  }

  return {};
};
