import { test } from '@core/fixtures/test-fixtures';
import { standardUser } from '@domains/login-domain';

test.describe('Smoke - Authentication', () => {
  test('user can login successfully @smoke @ui', async ({ auth, products }) => {
    await auth.loginAs(standardUser());
    await auth.verifyLoginSuccess();
    await products.verifyProductsLoaded();
  });
});
