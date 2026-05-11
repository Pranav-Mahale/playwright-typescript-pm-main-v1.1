import { execSync } from 'child_process';

execSync('npx playwright test tests/smoke --project=chromium', { stdio: 'inherit' });
