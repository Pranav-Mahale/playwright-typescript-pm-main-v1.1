import { test } from '@core/fixtures/test-fixtures';
import { standardUser } from '@domains/login-domain';

test.describe('AI Generated - Guardrail sample', () => {
  test('generated login check follows capability rule @ai-generated', async ({ auth }) => {
    await auth.loginAs(standardUser());
    await auth.verifyLoginSuccess();
  });
});
