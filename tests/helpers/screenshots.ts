import { Page, Locator } from '@playwright/test';
import * as path from 'path';

/**
 * Helper functions cho screenshots trong Playwright tests
 * @see https://playwright.dev/docs/screenshots
 */

/**
 * Options cho screenshot
 */
export interface ScreenshotOptions {
  /** Chụp full page hay chỉ viewport */
  fullPage?: boolean;
  /** Chụp một element cụ thể */
  element?: Locator;
  /** Chất lượng ảnh (0-100), chỉ áp dụng cho JPEG */
  quality?: number;
  /** Chế độ màu: 'light' | 'dark' | 'no-preference' */
  colorScheme?: 'light' | 'dark' | 'no-preference';
  /** Ẩn caret trong input fields */
  caret?: 'hide' | 'show';
  /** Chỉ chụp phần tử được chỉ định */
  clip?: { x: number; y: number; width: number; height: number };
  /** Chờ animation hoàn thành */
  animations?: 'disabled' | 'allow';
  /** Chờ font load */
  waitForFonts?: boolean;
}

/**
 * Lưu screenshot với tên file tự động dựa trên test name và step
 * @param page - Playwright page object
 * @param testName - Tên test (thường là test.info().title)
 * @param stepName - Tên step (optional)
 * @param options - Screenshot options
 * @returns Đường dẫn file screenshot đã lưu
 */
export async function saveScreenshot(
  page: Page,
  testName: string,
  stepName?: string,
  options: ScreenshotOptions = {}
): Promise<string> {
  // Tạo tên file từ test name và step name
  const sanitizedName = testName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const stepSuffix = stepName
    ? `-${stepName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
    : '';
  
  const fileName = `${sanitizedName}${stepSuffix}.png`;
  const filePath = path.join('test-results', 'screenshots', fileName);
  
  // Tạo thư mục nếu chưa tồn tại
  const fs = require('fs');
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Chụp screenshot
  if (options.element) {
    await options.element.screenshot({ path: filePath, ...options });
  } else {
    await page.screenshot({ path: filePath, ...options });
  }
  
  return filePath;
}

/**
 * Chụp screenshot của một element cụ thể
 * @param element - Locator của element cần chụp
 * @param testName - Tên test
 * @param elementName - Tên element (optional)
 * @param options - Screenshot options
 */
export async function saveElementScreenshot(
  element: Locator,
  testName: string,
  elementName?: string,
  options: ScreenshotOptions = {}
): Promise<string> {
  const sanitizedName = testName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const elementSuffix = elementName
    ? `-${elementName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
    : '-element';
  
  const fileName = `${sanitizedName}${elementSuffix}.png`;
  const filePath = path.join('test-results', 'screenshots', fileName);
  
  const fs = require('fs');
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  await element.screenshot({ path: filePath, ...options });
  
  return filePath;
}

/**
 * Chụp screenshot full page
 * @param page - Playwright page object
 * @param testName - Tên test
 * @param stepName - Tên step (optional)
 */
export async function saveFullPageScreenshot(
  page: Page,
  testName: string,
  stepName?: string
): Promise<string> {
  return saveScreenshot(page, testName, stepName, { fullPage: true });
}

/**
 * Chụp screenshot với dark mode
 * @param page - Playwright page object
 * @param testName - Tên test
 * @param stepName - Tên step (optional)
 */
export async function saveDarkModeScreenshot(
  page: Page,
  testName: string,
  stepName?: string
): Promise<string> {
  return saveScreenshot(page, testName, stepName, {
    fullPage: true,
    colorScheme: 'dark',
  });
}

/**
 * Chụp screenshot của viewport (không phải full page)
 * @param page - Playwright page object
 * @param testName - Tên test
 * @param stepName - Tên step (optional)
 */
export async function saveViewportScreenshot(
  page: Page,
  testName: string,
  stepName?: string
): Promise<string> {
  return saveScreenshot(page, testName, stepName, { fullPage: false });
}

/**
 * Chụp screenshot với animation disabled
 * @param page - Playwright page object
 * @param testName - Tên test
 * @param stepName - Tên step (optional)
 */
export async function saveScreenshotWithoutAnimations(
  page: Page,
  testName: string,
  stepName?: string
): Promise<string> {
  return saveScreenshot(page, testName, stepName, {
    fullPage: true,
    animations: 'disabled',
  });
}
