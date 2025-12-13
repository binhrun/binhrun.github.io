import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Helper functions cho ARIA snapshots
 * @see https://playwright.dev/docs/aria-snapshots
 * 
 * Lưu ý: Tính năng aria-snapshots đầy đủ chỉ có trong Playwright v1.40+ với page.snapshot({ mode: 'aria' })
 * Hiện tại sử dụng cách tiếp cận thay thế để lấy accessibility tree
 */

/**
 * Lấy ARIA snapshot của trang bằng cách lấy accessibility info từ các elements
 * @param page - Playwright page object
 * @returns Object chứa accessibility tree
 */
async function getAriaTree(page: Page): Promise<any> {
  // Lấy tất cả các elements có role accessibility
  const elements = await page.locator('[role], [aria-label], [aria-labelledby], heading, button, link, input, nav, main, article, section').all();
  
  const tree: any[] = [];
  
  for (const element of elements.slice(0, 100)) { // Giới hạn 100 elements để tránh quá tải
    try {
      const role = await element.getAttribute('role');
      const ariaLabel = await element.getAttribute('aria-label');
      const text = await element.textContent();
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      
      tree.push({
        role: role || tagName,
        name: ariaLabel || text?.trim() || '',
        tag: tagName,
      });
    } catch (e) {
      // Bỏ qua elements không thể truy cập
    }
  }
  
  return { role: 'document', children: tree };
}

/**
 * Lấy ARIA snapshot của trang và lưu vào file
 * @param page - Playwright page object
 * @param snapshotName - Tên của snapshot (sẽ được dùng làm tên file)
 * @param outputDir - Thư mục để lưu snapshot (mặc định: test-results/aria-snapshots)
 */
export async function saveAriaSnapshot(
  page: Page,
  snapshotName: string,
  outputDir: string = 'test-results/aria-snapshots'
): Promise<string> {
  const ariaSnapshot = await getAriaTree(page);
  
  // Tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Lưu snapshot vào file (chuyển đổi object thành JSON string)
  const filePath = path.join(outputDir, `${snapshotName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(ariaSnapshot, null, 2), 'utf-8');
  
  return filePath;
}

/**
 * So sánh ARIA snapshot hiện tại với snapshot đã lưu
 * @param page - Playwright page object
 * @param snapshotName - Tên của snapshot đã lưu
 * @param outputDir - Thư mục chứa snapshot đã lưu (mặc định: test-results/aria-snapshots)
 * @returns Object chứa kết quả so sánh: { match: boolean, current: string, saved: string }
 */
export async function compareAriaSnapshot(
  page: Page,
  snapshotName: string,
  outputDir: string = 'test-results/aria-snapshots'
): Promise<{ match: boolean; current: any; saved: any | null }> {
  const currentSnapshot = await getAriaTree(page);
  const filePath = path.join(outputDir, `${snapshotName}.json`);
  
  if (!fs.existsSync(filePath)) {
    // Nếu snapshot chưa tồn tại, lưu snapshot hiện tại
    await saveAriaSnapshot(page, snapshotName, outputDir);
    return {
      match: true,
      current: currentSnapshot,
      saved: null,
    };
  }
  
  const savedSnapshot = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const match = JSON.stringify(currentSnapshot) === JSON.stringify(savedSnapshot);
  
  return {
    match,
    current: currentSnapshot,
    saved: savedSnapshot,
  };
}

/**
 * Kiểm tra ARIA snapshot có chứa các elements được chỉ định
 * @param page - Playwright page object
 * @param expectedElements - Mảng các strings cần có trong snapshot (role hoặc name)
 * @returns Object chứa kết quả: { allFound: boolean, missing: string[] }
 */
export async function checkAriaSnapshotContains(
  page: Page,
  expectedElements: string[]
): Promise<{ allFound: boolean; missing: string[] }> {
  const ariaSnapshot = await getAriaTree(page);
  const snapshotString = JSON.stringify(ariaSnapshot);
  const missing: string[] = [];
  
  for (const element of expectedElements) {
    if (!snapshotString.includes(element)) {
      missing.push(element);
    }
  }
  
  return {
    allFound: missing.length === 0,
    missing,
  };
}
