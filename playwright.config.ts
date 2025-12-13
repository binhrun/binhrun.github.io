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
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['html', { open: 'never' }], ['list']],
  /* Shared settings cho tất cả projects */
  use: {
    /* Base URL để sử dụng trong actions như `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
    /* Collect trace khi retry test case bị fail */
    trace: 'on-first-retry',
    /* Screenshot configuration
     * - 'off': Không chụp screenshot tự động
     * - 'on': Chụp screenshot ở mỗi step (có thể tốn nhiều dung lượng)
     * - 'only-on-failure': Chỉ chụp khi test fail (khuyến nghị, tiết kiệm dung lượng)
     */
    screenshot: 'only-on-failure',
    /* Video recording */
    video: 'retain-on-failure',
  },

  /* Cấu hình snapshot paths cho visual comparisons
   * Screenshots được lưu trong test-results/ theo cấu trúc:
   * test-results/{project}/{test-file}-{test-name}/{screenshot-name}.png
   */
  snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}',

  /* Cấu hình expect cho snapshots */
  expect: {
    /* Thời gian timeout cho assertions */
    timeout: 5000,
    /* Cấu hình cho aria snapshots */
    toHaveAccessibilityTree: {
      /* So sánh aria tree với snapshot */
      threshold: 0.2,
    },
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
    // Luôn reuse nếu đã có server chạy (Cursor/terminal thường đã bật `yarn start`)
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
