import { expect, test } from '@playwright/test';

test.describe('REAL is working', () => {
  test('visit main page and take screenshot', async ({ page }) => {
    // If available, we set the target URL to a preview deployment URL provided by the ENVIRONMENT_URL created by Vercel.
    // Otherwise, we use the Production URL.
    const targetUrl =
      process.env.ENVIRONMENT_URL || 'https://deep-real.vercel.app'; //TODO: Move to global env

    // We visit the page. This waits for the "load" event by default.
    const response = await page.goto(targetUrl);

    // Test that the response did not fail
    expect(
      response?.status(),
      'should respond with correct status code'
    ).toBeLessThan(400);

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.jpg' }); //TODO: folder for screenshots
  });

  test('visit token 1 from sub0 and take screenshot', async ({ page }) => {
    // If available, we set the target URL to a preview deployment URL provided by the ENVIRONMENT_URL created by Vercel.
    // Otherwise, we use the Production URL.
    const targetDomain =
      process.env.ENVIRONMENT_URL || 'https://deep-real.vercel.app';

    const targetUrl = `${targetDomain}/assets/did:asset:deep:polkadot.asset-hub:13:1`;

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
});
