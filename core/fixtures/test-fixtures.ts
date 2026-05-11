import { test as base } from '@playwright/test';
import { AuthCapability } from '@capabilities/ui/auth-capability';
import { ProductCapability } from '@capabilities/ui/product-capability';
import { PostsCapability } from '@capabilities/api/posts-capability';
import { PostContractCapability } from '@capabilities/contract/post-contract-capability';
import { UserDatabaseCapability } from '@capabilities/database/user-database-capability';
import { PerformanceCapability } from '@capabilities/performance/performance-capability';
import { installObservabilityHooks } from '@core/hooks/observability-hooks';

type Capabilities = {
  auth: AuthCapability;
  products: ProductCapability;
  posts: PostsCapability;
  postContract: PostContractCapability;
  userDb: UserDatabaseCapability;
  performance: PerformanceCapability;
};

export const test = base.extend<Capabilities>({
  auth: async ({ page }, use) => {
    await use(new AuthCapability(page));
  },
  products: async ({ page }, use) => {
    await use(new ProductCapability(page));
  },
  posts: async ({ request }, use) => {
    await use(new PostsCapability(request));
  },
  postContract: async ({}, use) => {
    await use(new PostContractCapability());
  },
  userDb: async ({}, use) => {
    await use(new UserDatabaseCapability());
  },
  performance: async ({}, use) => {
    await use(new PerformanceCapability());
  }
});

installObservabilityHooks(test);
export { expect } from '@playwright/test';
