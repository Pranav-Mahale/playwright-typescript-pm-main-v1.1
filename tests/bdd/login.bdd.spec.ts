import { test } from '@core/fixtures/test-fixtures';
import { standardUser } from '@domains/login-domain';

test.describe('BDD - Login feature', () => {
  test('Given a valid user, When login is submitted, Then inventory is shown @bdd', async ({ auth, products }) => {
    await auth.loginAs(standardUser());
    await auth.verifyLoginSuccess();
    await products.verifyProductsLoaded();
  });
});
