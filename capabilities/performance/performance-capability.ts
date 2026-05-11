import { expect, type Page, type APIRequestContext } from '@playwright/test';
import { getEnvironmentConfig } from '@config/environment';

export class PerformanceCapability {
  async verifyApiLatency(request: APIRequestContext, endpoint: string, maxMs: number): Promise<void> {
    const start = Date.now();
    const response = await request.get(`${getEnvironmentConfig().apiBaseUrl}${endpoint}`);
    const duration = Date.now() - start;
    expect(response.ok()).toBeTruthy();
    expect(duration, `API ${endpoint} latency ${duration}ms should be <= ${maxMs}ms`).toBeLessThanOrEqual(maxMs);
  }

  async verifyUiLoad(page: Page, maxMs: number): Promise<void> {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const duration = Date.now() - start;
    expect(duration, `UI load duration ${duration}ms should be <= ${maxMs}ms`).toBeLessThanOrEqual(maxMs);
  }
}
