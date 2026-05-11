import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnvironmentConfig } from './config/environment';

dotenv.config();

const env = getEnvironmentConfig();

export default defineConfig({
  testDir: './tests',
  globalSetup: './core/hooks/global-setup.ts',
  timeout: 45_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 3 : Number(process.env.WORKERS ?? 3),
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'observability/reporters/playwright-results.json' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }]
  ],
  outputDir: 'test-results',
  use: {
    baseURL: env.baseUrl,
    headless: env.headless,
    trace: env.traceMode,
    video: env.videoMode,
    screenshot: env.screenshotMode,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
