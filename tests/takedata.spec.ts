import { test, expect } from './fixtures';

const BASE = process.env.BASE_URL ?? 'https://staging.ablespace.io';

test('Take Data: selected step appears in the graph for today', async ({ page }) => {
  await test.step('open Caseload (the debug Chrome must already be logged in)', async () => {
    await page.goto(`${BASE}/caseload`);
    await page.waitForURL(/signin|caseload|calendar/);

    // Fallback only if the browser is not logged in
    if (/signin/.test(page.url())) {
      const email = process.env.QA_EMAIL;
      const password = process.env.QA_PASSWORD;
      if (!email || !password) {
        throw new Error('Not logged in. Log in by hand in the debug Chrome, or set QA_EMAIL and QA_PASSWORD in .env');
      }
      await page.getByRole('textbox', { name: 'Email' }).fill(email);
      await page.getByRole('textbox', { name: 'Email' }).press('Enter');
      await page.getByRole('textbox', { name: 'Password' }).fill(password);
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await page
        .getByRole('button', { name: 'Keep me logged in' })
        .click({ timeout: 5000 })
        .catch(() => {});
      await page.goto(`${BASE}/caseload`);
    }

    await expect(page).toHaveURL(/caseload/);
  });

  await test.step('open Take Data for Demo Student 3', async () => {
    // The grid has names on the left and Take Data links on the right.
    // Both lists are in the same order, so find the position of the name first.
    const nameRows = page.getByRole('row', { name: /toggle row selection/i });
    await expect(nameRows.first()).toBeVisible({ timeout: 20_000 });

    // Names are lowercase in the page (capitalised by styling), so ignore case
    const texts = await nameRows.evaluateAll(rows => rows.map(r => r.textContent ?? ''));
    const index = texts.findIndex(t => /demo student 3\b/i.test(t));
    expect(index, 'Demo Student 3 should be listed in Caseload').toBeGreaterThanOrEqual(0);

    // Click the Take Data link at the same position
    await page.getByRole('link', { name: 'Take Data', exact: true }).nth(index).click();
    await expect(page).toHaveURL(/session/, { timeout: 20_000 });
  });

  await test.step('select "Gets hands wet" on the Reading goal', async () => {
    // Fail with a clear message if the page is no longer the session screen
    await expect(page).toHaveURL(/session/);

    const label = page.getByText('Gets hands wet', { exact: true }).first();
    await expect(label).toBeVisible({ timeout: 20_000 });

    // The checkbox in the same row as the label
    const step = label
      .locator('xpath=ancestor::*[.//input[@type="checkbox"]][1]')
      .locator('input[type="checkbox"]');
    await step.check({ force: true });
    await expect(step).toBeChecked();
  });

  await test.step('verify the graph shows the step and today', async () => {
    await page.getByTestId('graph-tab').click();

    // 1. The selected step is represented in the graph legend
    await expect(page.getByText('Gets hands wet').first()).toBeVisible();

    // 2. Today's data is shown (the graph axis uses MM/DD, for example 10/08)
    const now = new Date();
    const today = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
    await expect(page.getByText(today).first()).toBeVisible();
  });
});