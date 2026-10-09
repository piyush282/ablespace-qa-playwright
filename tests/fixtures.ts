import { test as base, chromium, expect } from '@playwright/test';

export const test = base.extend({
  browser: [
    async ({}, use) => {
      const browser = await chromium.connectOverCDP('http://localhost:9222');
      await use(browser);
      // do not close your Chrome
    },
    { scope: 'worker' },
  ],
  context: async ({ browser }, use) => {
    await use(browser.contexts()[0]);
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

export { expect };