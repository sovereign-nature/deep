export async function load(event) {
  const slug = event.params.slug;

  type TestData = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
  };

  const res = await fetch(
    `https://directus.sovereignnature.com/items/aimm_dolphins/${slug}`
  );
  const { data }: { data: TestData } = await res.json();

  return { slug, data };
}
