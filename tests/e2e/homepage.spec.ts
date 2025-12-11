import { test, expect } from '@playwright/test';

test.describe('Trang chủ', () => {
  test('nên load thành công và hiển thị title', async ({ page }) => {
    const testName = 'nên-load-thành-công-và-hiển-thị-title';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra title của trang', async () => {
      await expect(page).toHaveTitle(/Ignite Cookbook for React Native/);
      await page.screenshot({ path: `test-results/${testName}-2-title-check.png`, fullPage: true });
    });
  });

  test('nên hiển thị hero section với title và description', async ({ page }) => {
    const testName = 'nên-hiển-thị-hero-section-với-title-và-description';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra hero title', async () => {
      const heroTitle = page.locator('h1').filter({ hasText: /Proven Recipes/i });
      await expect(heroTitle).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-hero-title.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra description', async () => {
      const description = page.getByText(/Starting from scratch doesn't always make sense/i);
      await expect(description).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-3-description.png`, fullPage: true });
    });
  });

  test('nên có button "Let\'s get cooking" và có thể click', async ({ page }) => {
    const testName = 'nên-có-button-lets-get-cooking-và-có-thể-click';
    let cookingButton;
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Tìm và kiểm tra button "Let\'s get cooking"', async () => {
      cookingButton = page.getByRole('link', { name: /Let's get cooking/i });
      await expect(cookingButton).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-button-visible.png`, fullPage: true });
    });
    
    await test.step('Click button và kiểm tra navigation', async () => {
      await cookingButton.click();
      await expect(page).toHaveURL(/.*\/docs\/intro/);
      await page.screenshot({ path: `test-results/${testName}-3-after-click.png`, fullPage: true });
    });
  });

  test('nên hiển thị section "Freshly added to the cookbook"', async ({ page }) => {
    const testName = 'nên-hiển-thị-section-freshly-added-to-the-cookbook';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra section header', async () => {
      const freshSection = page.getByText(/Freshly added to the cookbook/i);
      await expect(freshSection).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-fresh-section.png`, fullPage: true });
    });
  });

  test('nên có link "View all recipes"', async ({ page }) => {
    const testName = 'nên-có-link-view-all-recipes';
    let viewAllLink;
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra link "View all recipes"', async () => {
      viewAllLink = page.getByRole('link', { name: /View all recipes/i });
      await expect(viewAllLink).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-link-visible.png`, fullPage: true });
    });
    
    await test.step('Click link và kiểm tra navigation', async () => {
      await viewAllLink.click();
      await expect(page).toHaveURL(/.*\/docs\/intro/);
      await page.screenshot({ path: `test-results/${testName}-3-after-click.png`, fullPage: true });
    });
  });

  test('nên có navigation bar với logo', async ({ page }) => {
    const testName = 'nên-có-navigation-bar-với-logo';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra navbar có tồn tại', async () => {
      const navbar = page.locator('nav');
      await expect(navbar).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-navbar.png`, fullPage: true });
    });
  });
});
