import type { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = this.page.getByText('Products');
    this.inventoryItems = this.page.locator('[data-test="inventory-item"]');
    this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
  }

  addToCart(productName: string): Promise<void> {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .getByRole('button', { name: /add to cart/i })
      .click();
  }
}
