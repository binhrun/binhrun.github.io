import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility with axe-core', () => {
  test('should have accessibility violations on the home page', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);
  });

  test('should have accessibility violations on the activities page', async ({ page }) => {
    await page.goto('/activities');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);
  });

  test('should have accessibility violations on the docs page', async ({ page }) => {
    await page.goto('/docs/intro');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);
  });
});
