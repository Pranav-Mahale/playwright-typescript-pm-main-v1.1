import fs from 'fs-extra';
import path from 'path';

async function globalSetup(): Promise<void> {
  await fs.ensureDir(path.resolve('observability/metrics'));
  await fs.remove(path.resolve('observability/metrics/test-run-metrics.json'));
}

export default globalSetup;
