import { defineConfig, devices } from '@playwright/test';

/**
 * Cấu hình Playwright cho automation testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Chạy tests song song */
  fullyParallel: true,
  /* Fail build nếu có test bị retry */
  forbidOnly: !!process.env.CI,
  /* Retry trên CI */
  retries: process.env.CI ? 2 : 0,
  /* Số workers tối đa */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter để sử dụng */
  reporter: 'html',
  /* Shared settings cho tất cả projects */
  use: {
    /* Base URL để sử dụng trong actions như `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
    /* Collect trace khi retry test case bị fail */
    trace: 'on-first-retry',
    /* Screenshot ở mỗi step */
    screenshot: 'on',
    /* Video recording */
    video: 'retain-on-failure',
  },

  /* Cấu hình projects cho từng browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Chạy dev server trước khi test */
  webServer: {
    command: 'yarn start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
