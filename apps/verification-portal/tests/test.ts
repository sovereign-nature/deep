import { expect, test } from '@playwright/test';

test.describe('REAL is working', () => {
  test('visit main page and take screenshot', async ({ page }) => {
    // We visit the page. This waits for the "load" event by default.
    const response = await page.goto('/');
    // Test that the response did not fail
    expect(
      response?.status(),
      'should respond with correct status code'
    ).toBeLessThan(400);
    // Take a screenshot
    await page.screenshot({ path: 'tests/screenshots/screenshot.jpg' }); //TODO: folder for screenshots
  });
  test('visit token 1 from sub0 and take screenshot', async ({ page }) => {
    // We visit the page. This waits for the "load" event by default.
    const response = await page.goto(
      '/assets/did:asset:deep:polkadot.asset-hub:13:1'
    );
    // Test that the response did not fail
    expect(
      response?.status(),
      'should respond with correct status code'
    ).toBeLessThan(400);
    // Take a screenshot
    await page.screenshot({ path: 'tests/screenshots/screenshot2.jpg' });
  });
});

test.describe('REAL is rendering correct landing page content', () => {
  let title: string;
  let subtitleText: string;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    title = await page.getByTestId('title').innerText();
    subtitleText = await page.getByTestId('subtitle').innerText();
  });

  test('should render title', async () => {
    expect(title).toBe('Welcome to our REAL Verification Portal.');
  });

  test('should render the subtitle', async () => {
    expect(subtitleText).toBe(
      'Learn how your asset is helping real-world conservation efforts around the globe.'
    );
  });
});

test.describe('REAL asset page ', () => {
  test('should render the right content', async ({ page }) => {
    // We visit the page. This waits for the "load" event by default.
    await page.goto('/assets/did:asset:deep:polkadot.asset-hub:13:1');
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100, fullPage: true });
  });
});
