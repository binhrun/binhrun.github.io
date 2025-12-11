import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('nên load trang /blog và thấy danh sách bài viết', async ({ page }) => {
    const testName = 'blog-nên-load-trang-blog-và-thấy-danh-sách-bài-viết';

    await test.step('Navigate đến /blog', async () => {
      await page.goto('/blog');
      await page.screenshot({ path: `test-results/${testName}-1-navigate.png`, fullPage: true });
    });

    await test.step('Kiểm tra main content hiển thị', async () => {
      await expect(page.locator('main')).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-main-visible.png`, fullPage: true });
    });

    await test.step('Kiểm tra có bài Sample Blog Post', async () => {
      // Tránh strict-mode violation do link xuất hiện cả ở sidebar và list bài viết
      const samplePostLink = page
        .locator('main')
        .getByRole('article')
        .getByRole('link', { name: /Sample Blog Post/i });
      await expect(samplePostLink).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-3-sample-post-visible.png`, fullPage: true });
    });
  });

  test('nên vào được bài sample-post', async ({ page }) => {
    const testName = 'blog-nên-vào-được-bài-sample-post';

    await test.step('Mở trang /blog', async () => {
      await page.goto('/blog');
      await page.screenshot({ path: `test-results/${testName}-1-blog.png`, fullPage: true });
    });

    await test.step('Click bài Sample Blog Post', async () => {
      // Tránh strict-mode violation do link xuất hiện cả ở sidebar và list bài viết
      const samplePostLink = page
        .locator('main')
        .getByRole('article')
        .getByRole('link', { name: /Sample Blog Post/i });
      await expect(samplePostLink).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-2-link-visible.png`, fullPage: true });

      await samplePostLink.click();
      await page.screenshot({ path: `test-results/${testName}-3-after-click.png`, fullPage: true });
    });

    await test.step('Kiểm tra URL và tiêu đề bài', async () => {
      await expect(page).toHaveURL(/.*\/blog\/sample-post/);
      await expect(page.getByRole('heading', { name: /Sample Blog Post/i })).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-4-heading.png`, fullPage: true });
    });

    await test.step('Kiểm tra nội dung bài có đoạn mở đầu', async () => {
      await expect(page.getByText(/Welcome to the blog!/i)).toBeVisible();
      await page.screenshot({ path: `test-results/${testName}-5-content.png`, fullPage: true });
    });
  });
});
