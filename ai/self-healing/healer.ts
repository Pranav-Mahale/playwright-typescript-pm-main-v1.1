import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

const resultsPath = path.resolve('observability/reporters/playwright-results.json');
const healingReportPath = path.resolve('ai/self-healing/healing-report.json');

type HealingFinding = {
  title: string;
  rootCause: string;
  recommendation: string;
};

function runOptionalExternalHealer(): string {
  try {
    execSync('npx playwright-test-healer --help', { stdio: 'pipe' });
    return 'playwright-test-healer is available. Run it against failing traces according to your installed package options.';
  } catch {
    return 'playwright-test-healer is not installed or not available on PATH. Local heuristic analysis was generated instead.';
  }
}

async function main(): Promise<void> {
  const findings: HealingFinding[] = [];

  if (await fs.pathExists(resultsPath)) {
    const results = await fs.readJson(resultsPath);
    const failedSuites = JSON.stringify(results).match(/"status":"failed"/g)?.length ?? 0;

    if (failedSuites > 0) {
      findings.push({
        title: 'Failed Playwright tests detected',
        rootCause: 'Review failed test output, traces, console logs, and network failures.',
        recommendation: 'Prefer role/data-testid selectors, wait for user-visible outcomes, and stabilize test data.'
      });
    }
  }

  if (findings.length === 0) {
    findings.push({
      title: 'No failures detected',
      rootCause: 'Latest available result file does not show failed tests.',
      recommendation: 'Keep trace retain-on-failure enabled and review flaky retries in CI.'
    });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    externalHealerStatus: runOptionalExternalHealer(),
    findings
  };

  await fs.ensureDir(path.dirname(healingReportPath));
  await fs.writeJson(healingReportPath, report, { spaces: 2 });
  console.log(`Healing report generated at ${healingReportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
