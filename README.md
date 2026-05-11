# Enterprise Playwright TypeScript Automation Framework

This is a simple, capability-driven Playwright framework for beginner to intermediate automation engineers. It supports UI, API, E2E, smoke, regression, contract, database, performance, BDD, and AI-generated test organization.

## Quick Start

```bash
npm install
npx playwright install
npm test
npm run heal
npm run report:summary
```

## Useful Commands

```bash
npm run test:smoke
npm run test:api
npm run test:chromium
npm run test:headed
npm run report:allure
```

## Architecture Rule

Tests use capabilities from `core/fixtures/test-fixtures.ts`. They should not create page objects, services, or API clients directly.

## Reports

- Playwright HTML: `reports/html-report`
- Allure results: `reports/allure-results`
- Markdown summary: `reports/test-report.md`
- Logs: `observability/logs/framework.log`
- Metrics: `observability/metrics/test-run-metrics.json`
