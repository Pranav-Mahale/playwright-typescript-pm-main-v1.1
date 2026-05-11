import { expect, type APIResponse, type Locator } from '@playwright/test';

export async function expectVisible(locator: Locator, label: string): Promise<void> {
  await expect(locator, `${label} should be visible`).toBeVisible();
}

export async function expectStatus(response: APIResponse, status: number): Promise<void> {
  expect(response.status(), `Expected API status ${status}`).toBe(status);
}
