import fs from 'fs-extra';
import path from 'path';
import type { ConsoleMessage, Request, TestType } from '@playwright/test';
import { logger } from '@core/utils/logger';
import type { TestRunMetric } from '@core/types/framework';

const metricsPath = path.resolve('observability/metrics/test-run-metrics.json');

export function installObservabilityHooks(test: TestType<any, any>): void {
  test.beforeAll(async () => {
    await fs.ensureDir(path.dirname(metricsPath));
    await fs.ensureDir(path.resolve('observability/traces'));
    logger.info('Test suite started');
  });

  test.beforeEach(async ({ page }, testInfo) => {
    logger.info(`Starting: ${testInfo.title}`);
    page.on('console', (message: ConsoleMessage) => logger.info(`[console:${message.type()}] ${message.text()}`));
    page.on('requestfailed', (request: Request) => logger.warn(`[network] ${request.method()} ${request.url()} failed`));
  });

  test.afterEach(async ({ browserName }, testInfo) => {
    const metric: TestRunMetric = {
      name: testInfo.title,
      status: testInfo.status ?? 'skipped',
      durationMs: testInfo.duration,
      browserName,
      retry: testInfo.retry
    };

    const metrics = (await fs.pathExists(metricsPath)) ? ((await fs.readJson(metricsPath)) as TestRunMetric[]) : [];
    metrics.push(metric);
    await fs.writeJson(metricsPath, metrics, { spaces: 2 });
    logger.info(`Finished: ${testInfo.title} -> ${testInfo.status} (${testInfo.duration}ms)`);
  });

  test.afterAll(async () => {
    logger.info('Test suite finished');
  });
}
