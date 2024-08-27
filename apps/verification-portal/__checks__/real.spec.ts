import { expect, test } from '@playwright/test';

test.describe('REAL is working', () => {
  const baseUrl =
    process.env.ENVIRONMENT_URL || 'https://real.sovereignnature.com';

  test('visit main page and take screenshot', async ({ page }) => {
    const targetUrl = baseUrl;

    const response = await page.goto(targetUrl);

    // Test that the response did not fail
    expect(
      response?.status(),
      'should respond with correct status code'
    ).toBeLessThan(400);

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.jpg' });
  });

  test('visit token 1 from sub0 and take screenshot', async ({ page }) => {
    const targetUrl = `${baseUrl}/assets/did:asset:deep:polkadot.asset-hub:13:1`;

    // We visit the page. This waits for the "load" event by default.
    const response = await page.goto(targetUrl);
    // Test that the response did not fail
    expect(
      response?.status(),
      'should respond with correct status code'
    ).toBeLessThan(400);

    // Take a screenshot
    await page.screenshot({ path: 'screenshot2.jpg' });
  });

  test('visit asset from Hotel Hideaway and take screenshot', async ({
    page,
  }) => {
    const targetUrl = `${baseUrl}/assets/did:asset:deep:hotel-hideaway.asset:african-elephant-onesie-hood`;

    // We visit the page. This waits for the "load" event by default.
    const response = await page.goto(targetUrl);
    // Test that the response did not fail
    expect(
      response?.status(),
      'should respond with correct status code'
    ).toBeLessThan(400);

    // Take a screenshot
    await page.screenshot({ path: 'screenshot3.jpg' });
  });
});
