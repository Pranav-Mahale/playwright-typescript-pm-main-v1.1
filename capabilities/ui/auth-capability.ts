import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LoginPage } from '@pages/auth/login-page';
import { ProductsPage } from '@pages/product/products-page';
import type { LoginUser } from '@domains/login-domain';

export class AuthCapability {
  private readonly loginPage: LoginPage;
  private readonly productsPage: ProductsPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.productsPage = new ProductsPage(page);
  }

  async loginAs(user: LoginUser): Promise<void> {
    await this.loginPage.open();
    await this.loginPage.login(user.username, user.password);
  }

  async verifyLoginSuccess(): Promise<void> {
    await expect(this.productsPage.title).toBeVisible();
  }

  async verifyLoginError(message: string): Promise<void> {
    await expect(this.loginPage.errorMessage).toContainText(message);
  }
}
