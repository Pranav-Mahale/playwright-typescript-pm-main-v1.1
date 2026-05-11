# CI/CD

Pipeline definitions:

- GitHub Actions: `.github/workflows/playwright.yml`
- Azure DevOps: `azure-pipelines/playwright-automation.yml`

Both pipelines install dependencies, install Playwright browsers, execute the test suite, generate reports, and publish artifacts.
