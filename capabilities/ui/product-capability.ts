import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ProductsPage } from '@pages/product/products-page';

export class ProductCapability {
  private readonly productsPage: ProductsPage;

  constructor(page: Page) {
    this.productsPage = new ProductsPage(page);
  }

  async verifyProductsLoaded(): Promise<void> {
    await expect(this.productsPage.inventoryItems.first()).toBeVisible();
    await expect(this.productsPage.inventoryItems).toHaveCount(6);
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productsPage.addToCart(productName);
  }

  async verifyCartCount(count: number): Promise<void> {
    await expect(this.productsPage.cartLink).toHaveText(String(count));
  }
}
