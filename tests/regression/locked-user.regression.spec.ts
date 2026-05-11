import { test } from '@core/fixtures/test-fixtures';
import { lockedOutUser } from '@domains/login-domain';

test.describe('Regression - Login validation', () => {
  test('locked user sees a clear login error @regression @ui', async ({ auth }) => {
    await auth.loginAs(lockedOutUser());
    await auth.verifyLoginError('Sorry, this user has been locked out');
  });
});
