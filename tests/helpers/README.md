# Test Helpers

Các helper functions để hỗ trợ việc viết tests trong Playwright.

## ARIA Snapshots

Helper functions để làm việc với ARIA snapshots trong Playwright tests.

Xem [aria-snapshot.ts](./aria-snapshot.ts) để biết thêm chi tiết về ARIA snapshots.

## Screenshots

Helper functions để chụp và quản lý screenshots trong tests.

### Cách sử dụng

#### 1. Chụp screenshot đơn giản

```typescript
import { saveScreenshot } from '../helpers/screenshots';

test('test example', async ({ page }) => {
  await page.goto('/');
  await saveScreenshot(page, 'test-example', 'navigate');
});
```

#### 2. Chụp full page screenshot

```typescript
import { saveFullPageScreenshot } from '../helpers/screenshots';

test('test example', async ({ page }) => {
  await page.goto('/');
  await saveFullPageScreenshot(page, 'test-example', 'homepage');
});
```

#### 3. Chụp screenshot của một element

```typescript
import { saveElementScreenshot } from '../helpers/screenshots';

test('test example', async ({ page }) => {
  await page.goto('/');
  const hero = page.getByRole('heading', { name: /Binh\.run/i });
  await saveElementScreenshot(hero, 'test-example', 'hero-section');
});
```

#### 4. Chụp screenshot với dark mode

```typescript
import { saveDarkModeScreenshot } from '../helpers/screenshots';

test('test example', async ({ page }) => {
  await page.goto('/');
  await saveDarkModeScreenshot(page, 'test-example', 'dark-mode');
});
```

#### 5. Chụp screenshot với options tùy chỉnh

```typescript
import { saveScreenshot } from '../helpers/screenshots';

test('test example', async ({ page }) => {
  await page.goto('/');
  await saveScreenshot(page, 'test-example', 'custom', {
    fullPage: true,
    quality: 90,
    animations: 'disabled',
    waitForFonts: true,
  });
});
```

### Screenshot Options

- `fullPage`: Chụp toàn bộ trang (mặc định: false)
- `element`: Locator của element cần chụp
- `quality`: Chất lượng ảnh 0-100 (chỉ cho JPEG)
- `colorScheme`: 'light' | 'dark' | 'no-preference'
- `caret`: 'hide' | 'show' - Ẩn/hiện caret trong input
- `clip`: { x, y, width, height } - Chỉ chụp một vùng cụ thể
- `animations`: 'disabled' | 'allow' - Tắt/bật animations
- `waitForFonts`: Đợi fonts load xong

### Screenshot Paths

Tất cả screenshots được lưu trong `test-results/screenshots/` với format:
```
test-results/screenshots/{test-name}-{step-name}.png
```

## Cấu hình Playwright

Screenshots được cấu hình trong `playwright.config.ts`:

```typescript
use: {
  screenshot: 'only-on-failure', // Chỉ chụp khi test fail
  // Hoặc 'on' để chụp mọi lúc, 'off' để tắt
},
```

### Screenshot Modes

- `'off'`: Không chụp screenshot tự động
- `'on'`: Chụp screenshot ở mỗi step
- `'only-on-failure'`: Chỉ chụp khi test fail (khuyến nghị)

## Tham khảo

- [Playwright Screenshots Documentation](https://playwright.dev/docs/screenshots)
- [Playwright Test Configuration](https://playwright.dev/docs/test-configuration)
