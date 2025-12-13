import { test, expect } from '@playwright/test';

test.describe('Trang chủ', () => {
  test('nên load thành công và hiển thị title', async ({ page }) => {
    const testName = 'nên-load-thành-công-và-hiển-thị-title';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra title của trang', async () => {
      await expect(page).toHaveTitle(/Binh\.run/i);
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
      const heroTitle = page.getByRole('heading', { level: 1, name: /Binh\.run/i });
      await expect(heroTitle).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-hero-title.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra description', async () => {
      const description = page.getByText(/Binh\.run là nền tảng/i);
      await expect(description).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-3-description.png`, fullPage: true });
    });
  });

  test('nên có CTA "Bắt đầu chạy ngay" trỏ đến /activities', async ({ page }) => {
    const testName = 'nên-có-cta-bắt-đầu-chạy-ngay-trỏ-đến-activities';
    let cta;
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Tìm và kiểm tra CTA', async () => {
      cta = page.getByRole('link', { name: /Bắt đầu chạy ngay/i });
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute('href', '/activities');
      await page.screenshot({ path: `test-results/${testName}-2-cta-visible.png`, fullPage: true });
    });
  });

  test('nên hiển thị "Hoạt động gần đây" và có link "Xem tất cả hoạt động"', async ({ page }) => {
    const testName = 'nên-hiển-thị-hoạt-động-gần-đây-và-link-xem-tất-cả-hoạt-động';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra section "Hoạt động gần đây"', async () => {
      await expect(page.getByText(/Hoạt động gần đây/i)).toBeVisible();
      // Có ít nhất 1 entry mock
      await expect(page.getByText(/Công viên|Hồ Tây/i).first()).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-recent-activities.png`, fullPage: true });
    });

    await test.step('Kiểm tra link "Xem tất cả hoạt động"', async () => {
      const allActivities = page.getByRole('link', { name: /Xem tất cả hoạt động/i });
      await expect(allActivities).toBeVisible();
      await expect(allActivities).toHaveAttribute('href', '/activities');
      await page.screenshot({ path: `test-results/${testName}-3-all-activities-link.png`, fullPage: true });
    });
  });

  test('nên hiển thị "Thống kê tuần này" và tổng quãng đường', async ({ page }) => {
    const testName = 'nên-hiển-thị-thống-kê-tuần-này-và-tổng-quãng-đường';
    
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });
    
    await test.step('Kiểm tra nội dung thống kê', async () => {
      await expect(page.getByText(/Thống kê tuần này/i)).toBeVisible();
      await expect(page.getByText(/42\.5 km/i)).toBeVisible();
      await expect(page.getByText(/5/i).first()).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-week-stats.png`, fullPage: true });
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

    await test.step('Kiểm tra logo Binh.run', async () => {
      const logo = page.getByRole('link', { name: /Binh\.run Logo/i });
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('href', '/');
      await page.screenshot({ path: `test-results/${testName}-3-logo.png`, fullPage: true });
    });
  });

  test('nên hiển thị section "Các buổi chạy gần đây" và link "Xem tất cả buổi chạy"', async ({ page }) => {
    const testName = 'nên-hiển-thị-các-buổi-chạy-gần-đây-và-link-xem-tất-cả-buổi-chạy';

    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });

    await test.step('Kiểm tra section và ít nhất 1 item chạy', async () => {
      await expect(page.getByText(/Các buổi chạy gần đây/i)).toBeVisible();
      await expect(page.getByRole('link', { name: /km/i }).first()).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-recent-runs.png`, fullPage: true });
    });

    await test.step('Kiểm tra link "Xem tất cả buổi chạy"', async () => {
      const allRuns = page.getByRole('link', { name: /Xem tất cả buổi chạy/i });
      await expect(allRuns).toBeVisible();
      await expect(allRuns).toHaveAttribute('href', '/activities');
      await page.screenshot({ path: `test-results/${testName}-3-all-runs-link.png`, fullPage: true });
    });
  });

  test('footer nên có copyright Binh.run', async ({ page }) => {
    const testName = 'footer-nên-có-copyright-binh-run';

    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });

    await test.step('Kiểm tra footer có Binh.run', async () => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      await expect(footer.getByRole('link', { name: /Binh\.run/i })).toBeVisible();
      await expect(page.getByText(/© 2025/i)).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-footer.png`, fullPage: true });
    });
  });
});
