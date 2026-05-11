# Execution Plan

1. Install dependencies with `npm install`.
2. Install browsers with `npx playwright install --with-deps` in CI or `npx playwright install` locally.
3. Run `npm test` for all suites and browsers.
4. Run `npm run heal` after failures to generate a healing analysis.
5. Run `npm run report:summary` to create `reports/test-report.md`.
