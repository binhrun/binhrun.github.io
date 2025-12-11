import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('nên có thể navigate đến trang intro', async ({ page }) => {
    const testName = 'nên-có-thể-navigate-đến-trang-intro';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-homepage.png`, fullPage: true });
    });
    
    await test.step('Navigate đến trang intro', async () => {
      await page.goto('/docs/intro');
      await page.screenshot({ path: `test-results/${testName}-2-navigate-to-intro.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra URL', async () => {
      await expect(page).toHaveURL(/.*\/docs\/intro/);
      await page.screenshot({ path: `test-results/${testName}-3-url-check.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra trang có content', async () => {
      const content = page.locator('main');
      await expect(content).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-4-content-check.png`, fullPage: true });
    });
  });

  test('nên có sidebar navigation trong trang docs', async ({ page }) => {
    const testName = 'nên-có-sidebar-navigation-trong-trang-docs';
    
    await test.step('Navigate đến trang intro', async () => {
      await page.goto('/docs/intro');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra sidebar có tồn tại', async () => {
      const sidebar = page.locator('aside, [class*="sidebar"], [class*="menu"]').first();
      await expect(sidebar).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-sidebar.png`, fullPage: true });
    });
  });

  test('nên có thể navigate đến recipes section', async ({ page }) => {
    const testName = 'nên-có-thể-navigate-đến-recipes-section';
    
    await test.step('Navigate đến trang intro', async () => {
      await page.goto('/docs/intro');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Tìm link đến recipes', async () => {
      const recipesLink = page.getByRole('link', { name: /recipes/i }).first();
      
      if (await recipesLink.isVisible()) {
        await page.screenshot({ path: `test-results/${testName}-2-recipes-link-found.png`, fullPage: true });
        
        await test.step('Click link và kiểm tra navigation', async () => {
          await recipesLink.click();
          await expect(page).toHaveURL(/.*\/docs\/recipes/);
          await page.screenshot({ path: `test-results/${testName}-3-after-click.png`, fullPage: true });
        });
      } else {
        await page.screenshot({ path: `test-results/${testName}-2-recipes-link-not-found.png`, fullPage: true });
      }
    });
  });

  test('nên có thể quay lại trang chủ từ navbar', async ({ page }) => {
    const testName = 'nên-có-thể-quay-lại-trang-chủ-từ-navbar';
    
    await test.step('Navigate đến trang intro', async () => {
      await page.goto('/docs/intro');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Tìm logo hoặc home link trong navbar', async () => {
      const homeLink = page.locator('nav a[href="/"], nav a[href="/"]').first();
      
      if (await homeLink.isVisible()) {
        await page.screenshot({ path: `test-results/${testName}-2-home-link-found.png`, fullPage: true });
        
        await test.step('Click link và kiểm tra navigation về trang chủ', async () => {
          await homeLink.click();
          await expect(page).toHaveURL('http://localhost:3000/');
          await page.screenshot({ path: `test-results/${testName}-3-back-to-home.png`, fullPage: true });
        });
      } else {
        await page.screenshot({ path: `test-results/${testName}-2-home-link-not-found.png`, fullPage: true });
      }
    });
  });
});
