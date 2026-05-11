import { test } from '@core/fixtures/test-fixtures';
import { standardUser } from '@domains/login-domain';

test.describe('UI - Product inventory', () => {
  test('product inventory renders expected items @ui', async ({ auth, products }) => {
    await auth.loginAs(standardUser());
    await products.verifyProductsLoaded();
  });
});
