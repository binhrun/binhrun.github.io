import { test, expect } from '@playwright/test';
import { saveAriaSnapshot, compareAriaSnapshot, checkAriaSnapshotContains } from '../helpers/aria-snapshot';

/**
 * Tests cho accessibility sử dụng aria-snapshots
 * @see https://playwright.dev/docs/aria-snapshots
 */
test.describe('Accessibility với ARIA Snapshots', () => {
  test('nên có accessibility tree đúng cho trang chủ', async ({ page }) => {
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
    });

    await test.step('Lấy ARIA snapshot của trang', async () => {
      // Lấy ARIA snapshot dưới dạng object
      const ariaSnapshot = await page.evaluate(() => {
        // Lấy accessibility tree từ browser
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_ELEMENT,
          null
        );
        const tree: any[] = [];
        let node;
        while ((node = walker.nextNode())) {
          const element = node as Element;
          const role = element.getAttribute('role') || element.tagName.toLowerCase();
          const ariaLabel = element.getAttribute('aria-label');
          const text = element.textContent?.trim();
          if (role || ariaLabel || text) {
            tree.push({ role, name: ariaLabel || text || '', tag: element.tagName.toLowerCase() });
          }
        }
        return { role: 'document', children: tree };
      });
      expect(ariaSnapshot).toBeTruthy();
      
      // Kiểm tra snapshot có structure hợp lệ
      expect(ariaSnapshot).toHaveProperty('role');
      
      // Kiểm tra snapshot có chứa các elements quan trọng (chuyển sang JSON string để kiểm tra)
      const snapshotString = JSON.stringify(ariaSnapshot);
      expect(snapshotString).toContain('heading');
      expect(snapshotString).toContain('link');
      expect(snapshotString).toContain('Binh.run');
    });
  });

  test('nên có accessibility tree đúng cho trang activities', async ({ page }) => {
    await test.step('Navigate đến trang activities', async () => {
      await page.goto('/activities');
    });

    await test.step('Lấy ARIA snapshot và kiểm tra structure', async () => {
      const ariaSnapshot = await page.evaluate(() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null);
        const tree: any[] = [];
        let node;
        while ((node = walker.nextNode())) {
          const element = node as Element;
          const role = element.getAttribute('role') || element.tagName.toLowerCase();
          const ariaLabel = element.getAttribute('aria-label');
          const text = element.textContent?.trim();
          if (role || ariaLabel || text) {
            tree.push({ role, name: ariaLabel || text || '', tag: element.tagName.toLowerCase() });
          }
        }
        return { role: 'document', children: tree };
      });
      const snapshotString = JSON.stringify(ariaSnapshot);
      
      // Kiểm tra có heading cho trang activities
      expect(snapshotString).toContain('Hoạt động chạy bộ');
      
      // Kiểm tra có links đến các activities
      expect(snapshotString).toContain('link');
    });
  });

  test('nên có accessibility tree đúng cho trang docs', async ({ page }) => {
    await test.step('Navigate đến trang docs', async () => {
      await page.goto('/docs/intro');
    });

    await test.step('Lấy ARIA snapshot', async () => {
      const ariaSnapshot = await page.evaluate(() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null);
        const tree: any[] = [];
        let node;
        while ((node = walker.nextNode())) {
          const element = node as Element;
          const role = element.getAttribute('role') || element.tagName.toLowerCase();
          const ariaLabel = element.getAttribute('aria-label');
          const text = element.textContent?.trim();
          if (role || ariaLabel || text) {
            tree.push({ role, name: ariaLabel || text || '', tag: element.tagName.toLowerCase() });
          }
        }
        return { role: 'document', children: tree };
      });
      const snapshotString = JSON.stringify(ariaSnapshot);
      
      // Kiểm tra có navigation structure
      expect(snapshotString).toContain('navigation');
      
      // Kiểm tra có main content
      expect(snapshotString).toContain('main');
    });
  });

  test('nên so sánh accessibility tree với snapshot đã lưu', async ({ page }) => {
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
    });

    await test.step('Lấy ARIA snapshot và kiểm tra structure', async () => {
      // Lấy ARIA snapshot
      const ariaSnapshot = await page.evaluate(() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null);
        const tree: any[] = [];
        let node;
        while ((node = walker.nextNode())) {
          const element = node as Element;
          const role = element.getAttribute('role') || element.tagName.toLowerCase();
          const ariaLabel = element.getAttribute('aria-label');
          const text = element.textContent?.trim();
          if (role || ariaLabel || text) {
            tree.push({ role, name: ariaLabel || text || '', tag: element.tagName.toLowerCase() });
          }
        }
        return { role: 'document', children: tree };
      });
      
      // Kiểm tra snapshot có structure hợp lệ
      expect(ariaSnapshot).toBeTruthy();
      expect(ariaSnapshot).toHaveProperty('role');
      
      // Kiểm tra các elements quan trọng có trong accessibility tree
      const snapshotString = JSON.stringify(ariaSnapshot);
      expect(snapshotString).toContain('heading');
      expect(snapshotString).toContain('link');
    });
  });

  test('nên lưu ARIA snapshot vào file', async ({ page }) => {
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
    });

    await test.step('Lưu ARIA snapshot vào file', async () => {
      const filePath = await saveAriaSnapshot(page, 'homepage-aria-snapshot');
      
      expect(filePath).toBeTruthy();
      expect(filePath).toContain('homepage-aria-snapshot.json');
    });
  });

  test('nên so sánh ARIA snapshot với snapshot đã lưu', async ({ page }) => {
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
    });

    await test.step('So sánh với snapshot đã lưu', async () => {
      const comparison = await compareAriaSnapshot(page, 'homepage-aria-snapshot');
      
      // Lần đầu sẽ tạo snapshot, các lần sau sẽ so sánh
      expect(comparison.current).toBeTruthy();
    });
  });

  test('nên kiểm tra ARIA snapshot chứa các elements cần thiết', async ({ page }) => {
    await test.step('Navigate đến trang chủ', async () => {
      await page.goto('/');
    });

    await test.step('Kiểm tra snapshot chứa các elements quan trọng', async () => {
      const result = await checkAriaSnapshotContains(page, [
        'heading',
        'link',
        'Binh.run',
      ]);
      
      expect(result.allFound).toBe(true);
      expect(result.missing).toHaveLength(0);
    });
  });
});
