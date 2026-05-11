import { test } from '@core/fixtures/test-fixtures';
import { standardUser } from '@domains/login-domain';
import { products as productData } from '@data/fixtures/products.fixture';

test.describe('E2E - Shopping cart', () => {
  test('user can add a product to cart @e2e @regression', async ({ auth, products }) => {
    await auth.loginAs(standardUser());
    await auth.verifyLoginSuccess();
    await products.addProductToCart(productData.backpack);
    await products.verifyCartCount(1);
  });
});
