# ARIA Snapshots Helper

Helper functions để làm việc với ARIA snapshots trong Playwright tests.

## Lưu ý về phiên bản

Tính năng aria-snapshots đầy đủ (`page.snapshot({ mode: 'aria' })`) chỉ có trong Playwright v1.40+. 

Hiện tại project đang sử dụng Playwright v1.57.0, nhưng API này có thể cần được enable hoặc chỉ có trong các phiên bản mới hơn. Helper functions này sử dụng cách tiếp cận thay thế để lấy accessibility tree.

## Cách sử dụng

### 1. Lưu ARIA snapshot vào file

```typescript
import { saveAriaSnapshot } from '../helpers/aria-snapshot';

test('lưu snapshot', async ({ page }) => {
  await page.goto('/');
  const filePath = await saveAriaSnapshot(page, 'homepage-snapshot');
  console.log('Snapshot saved to:', filePath);
});
```

### 2. So sánh với snapshot đã lưu

```typescript
import { compareAriaSnapshot } from '../helpers/aria-snapshot';

test('so sánh snapshot', async ({ page }) => {
  await page.goto('/');
  const comparison = await compareAriaSnapshot(page, 'homepage-snapshot');
  
  if (!comparison.match) {
    console.log('Snapshot khác với bản đã lưu!');
  }
});
```

### 3. Kiểm tra snapshot chứa các elements cần thiết

```typescript
import { checkAriaSnapshotContains } from '../helpers/aria-snapshot';

test('kiểm tra elements', async ({ page }) => {
  await page.goto('/');
  const result = await checkAriaSnapshotContains(page, [
    'heading',
    'link',
    'button',
  ]);
  
  expect(result.allFound).toBe(true);
  if (result.missing.length > 0) {
    console.log('Thiếu elements:', result.missing);
  }
});
```

## Cấu trúc snapshot

Snapshot được lưu dưới dạng JSON với cấu trúc:

```json
{
  "role": "document",
  "children": [
    {
      "role": "heading",
      "name": "Binh.run",
      "tag": "h1"
    },
    {
      "role": "link",
      "name": "Bắt đầu chạy ngay",
      "tag": "a"
    }
  ]
}
```

## Nâng cấp lên Playwright mới hơn

Để sử dụng tính năng aria-snapshots chính thức của Playwright:

1. Upgrade Playwright lên phiên bản mới nhất:
   ```bash
   yarn upgrade @playwright/test@latest playwright@latest
   ```

2. Sử dụng API chính thức:
   ```typescript
   const ariaSnapshot = await page.snapshot({ mode: 'aria' });
   ```

## Tham khảo

- [Playwright ARIA Snapshots Documentation](https://playwright.dev/docs/aria-snapshots)
- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
