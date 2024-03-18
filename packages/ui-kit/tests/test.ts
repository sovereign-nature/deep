import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	const h1Element = await page.$('h1');
	const h1Text = await h1Element?.innerText();
	expect(h1Text).toBe('Ui-kit library');
});
