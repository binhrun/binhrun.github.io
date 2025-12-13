import { test, expect } from '@playwright/test';
import {
  saveScreenshot,
  saveFullPageScreenshot,
  saveElementScreenshot,
  saveDarkModeScreenshot,
  saveViewportScreenshot,
} from '../helpers/screenshots';

/**
 * Ví dụ sử dụng screenshot helpers
 * @see https://playwright.dev/docs/screenshots
 */
test.describe('Screenshot Examples', () => {
  test('ví dụ: chụp screenshot đơn giản', async ({ page }) => {
    await page.goto('/');
    
    // Chụp screenshot với tên test và step
    const screenshotPath = await saveScreenshot(
      page,
      'ví dụ chụp screenshot đơn giản',
      'navigate-to-homepage'
    );
    
    expect(screenshotPath).toContain('test-results/screenshots');
    expect(screenshotPath).toContain('.png');
  });

  test('ví dụ: chụp full page screenshot', async ({ page }) => {
    await page.goto('/');
    
    // Chụp toàn bộ trang
    const screenshotPath = await saveFullPageScreenshot(
      page,
      'ví dụ chụp full page screenshot',
      'homepage-full'
    );
    
    expect(screenshotPath).toContain('test-results/screenshots');
  });

  test('ví dụ: chụp screenshot của một element', async ({ page }) => {
    await page.goto('/');
    
    // Tìm element và chụp screenshot
    const heroTitle = page.getByRole('heading', { level: 1, name: /Binh\.run/i });
    await expect(heroTitle).toBeVisible();
    
    const screenshotPath = await saveElementScreenshot(
      heroTitle,
      'ví dụ chụp screenshot của một element',
      'hero-title'
    );
    
    expect(screenshotPath).toContain('test-results/screenshots');
  });

  test('ví dụ: chụp screenshot với options tùy chỉnh', async ({ page }) => {
    await page.goto('/');
    
    // Chụp với các options tùy chỉnh
    const screenshotPath = await saveScreenshot(
      page,
      'ví dụ chụp screenshot với options tùy chỉnh',
      'custom-options',
      {
        fullPage: true,
        animations: 'disabled',
        waitForFonts: true,
      }
    );
    
    expect(screenshotPath).toContain('test-results/screenshots');
  });

  test('ví dụ: chụp screenshot dark mode', async ({ page }) => {
    await page.goto('/');
    
    // Chụp với dark mode
    const screenshotPath = await saveDarkModeScreenshot(
      page,
      'ví dụ chụp screenshot dark mode',
      'dark-mode-view'
    );
    
    expect(screenshotPath).toContain('test-results/screenshots');
  });

  test('ví dụ: chụp screenshot viewport', async ({ page }) => {
    await page.goto('/');
    
    // Chỉ chụp viewport, không phải full page
    const screenshotPath = await saveViewportScreenshot(
      page,
      'ví dụ chụp screenshot viewport',
      'viewport-only'
    );
    
    expect(screenshotPath).toContain('test-results/screenshots');
  });

  test('ví dụ: chụp nhiều screenshots trong một test', async ({ page }) => {
    const testName = 'ví dụ chụp nhiều screenshots trong một test';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await saveScreenshot(page, testName, 'step-1-navigate');
    });
    
    await test.step('Kiểm tra hero section', async () => {
      const heroTitle = page.getByRole('heading', { level: 1, name: /Binh\.run/i });
      await expect(heroTitle).toBeVisible();
      await saveElementScreenshot(heroTitle, testName, 'step-2-hero');
    });
    
    await test.step('Chụp full page', async () => {
      await saveFullPageScreenshot(page, testName, 'step-3-full-page');
    });
  });
});
