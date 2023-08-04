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

	const res = await fetch(`https://64b80f7e21b9aa6eb07980f8.mockapi.io/links/${slug}`);
	const apiData: TestData = await res.json();

	return { slug, apiData };
}
