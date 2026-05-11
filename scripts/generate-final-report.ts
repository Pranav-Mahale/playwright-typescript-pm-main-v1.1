import fs from 'fs-extra';
import path from 'path';
import { getEnvironmentConfig } from '../config/environment';
import type { TestRunMetric } from '../core/types/framework';

const metricsPath = path.resolve('observability/metrics/test-run-metrics.json');
const playwrightJsonPath = path.resolve('observability/reporters/playwright-results.json');
const reportPath = path.resolve('reports/test-report.md');

function percent(value: number, total: number): string {
  return total === 0 ? '0%' : `${Math.round((value / total) * 100)}%`;
}

async function main(): Promise<void> {
  const env = getEnvironmentConfig();
  const metrics = await loadMetrics();
  const total = metrics.length;
  const passed = metrics.filter((metric) => metric.status === 'passed').length;
  const failed = metrics.filter((metric) => metric.status === 'failed' || metric.status === 'timedOut').length;
  const skipped = metrics.filter((metric) => metric.status === 'skipped').length;
  const browsers = [...new Set(metrics.map((metric) => metric.browserName))].join(', ') || 'Not executed';
  const retryCount = metrics.reduce((count, metric) => count + metric.retry, 0);
  const averageDuration = total === 0 ? 0 : Math.round(metrics.reduce((sum, metric) => sum + metric.durationMs, 0) / total);
  const stabilityScore = total === 0 ? 0 : Math.max(0, Math.round(((passed - retryCount) / total) * 100));

  const report = `# Enterprise Playwright Automation Execution Report

Generated: ${new Date().toISOString()}

## 1. Executive Summary

| Metric | Value |
| --- | --- |
| Planned tests | UI, API, E2E, smoke, regression, contract, database, performance, BDD, AI generated |
| Executed tests | ${total} |
| Automated coverage | Login, inventory, cart, API CRUD sample, schema contract, seed validation, latency checks |
| Manual coverage | Exploratory notes included below |
| Pass percentage | ${percent(passed, total)} |
| Fail percentage | ${percent(failed, total)} |
| Browser coverage | ${browsers} |
| Environment | ${env.name} |
| Base URL | ${env.baseUrl} |
| API Base URL | ${env.apiBaseUrl} |

## 2. Manual Testing Findings

- UX observations: demo app login and inventory flows are simple and suitable for training automation engineers.
- Exploratory findings: locked user validation is covered because it is a high-value negative path.
- Edge cases: invalid credentials, empty cart checkout, and sorting combinations can be added next.
- Functional gaps: checkout completion and logout are not yet automated.

## 3. Automation Results

| Status | Count |
| --- | ---: |
| Passed | ${passed} |
| Failed | ${failed} |
| Skipped | ${skipped} |
| Retry attempts | ${retryCount} |
| Average duration | ${averageDuration} ms |
| Stability score | ${stabilityScore}% |

Browser-wise details are available in \`observability/metrics/test-run-metrics.json\`, the HTML report, and Allure results.

## 4. Healing Report

- Root causes: generated from failed Playwright output and trace artifacts when failures occur.
- Healed selectors: see \`ai/self-healing/healing-report.json\` after running \`npm run heal\`.
- Assertion fixes: no automatic assertion rewrite is performed without review.
- Timing improvements: retry and trace modes are configured in \`playwright.config.ts\`.
- Non-healable failures: network outages, application defects, and invalid test data require engineering review.

## 5. Defect Report

| Bug ID | Severity | Title | Description | Steps | Expected | Actual | Evidence | Environment |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N/A | N/A | No confirmed product defect from generated summary | Add defects here after triage | N/A | N/A | N/A | reports/html-report, test-results | ${env.name} |

## 6. Coverage Analysis

- Feature coverage: authentication, inventory listing, cart badge update.
- API coverage: GET and POST posts endpoints.
- DB coverage: seed-data integrity simulation through database capability.
- Contract coverage: JSON schema validation for post response.
- Automation gaps: checkout, sorting, visual regression, real database adapter.
- Risk areas: external demo sites can be unavailable or rate limited.

## 7. Observability Insights

- Logs: \`observability/logs/framework.log\`.
- Metrics: \`observability/metrics/test-run-metrics.json\`.
- Traces/videos/screenshots: \`test-results/\` and Playwright HTML report.
- API latency: tracked by performance suite.
- Failure trends: review retries and failed metrics after each CI run.

## 8. Recommendations

- Quality assessment: framework is ready as a training-friendly enterprise baseline.
- Stability score: ${stabilityScore}% from current local metrics.
- CI/CD readiness: GitHub Actions and Azure DevOps pipelines are included.
- Production readiness: connect real secrets, test data cleanup, and environment-specific URLs.
- Next actions: add checkout coverage, real DB client, and tag-based release gates.
`;

  await fs.ensureDir(path.dirname(reportPath));
  await fs.writeFile(reportPath, report);
  console.log(`Final report generated at ${reportPath}`);
}

async function loadMetrics(): Promise<TestRunMetric[]> {
  if (await fs.pathExists(playwrightJsonPath)) {
    const report = await fs.readJson(playwrightJsonPath);
    const metrics: TestRunMetric[] = [];

    function visitSuite(suite: any): void {
      for (const spec of suite.specs ?? []) {
        for (const test of spec.tests ?? []) {
          const lastResult = test.results?.[test.results.length - 1];
          if (!lastResult) {
            continue;
          }

          metrics.push({
            name: spec.title,
            status: lastResult.status,
            durationMs: lastResult.duration ?? 0,
            browserName: test.projectName ?? 'unknown',
            retry: Math.max(0, (test.results?.length ?? 1) - 1)
          });
        }
      }

      for (const child of suite.suites ?? []) {
        visitSuite(child);
      }
    }

    for (const suite of report.suites ?? []) {
      visitSuite(suite);
    }

    if (metrics.length > 0) {
      return metrics;
    }
  }

  return (await fs.pathExists(metricsPath)) ? ((await fs.readJson(metricsPath)) as TestRunMetric[]) : [];
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
