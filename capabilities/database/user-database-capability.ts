import { expect } from '@playwright/test';
import { usersSeed } from '@data/seeds/users.seed';

export class UserDatabaseCapability {
  async verifySeedUserExists(username: string): Promise<void> {
    const exists = usersSeed.some((user) => user.username === username);
    expect(exists, `Seed user ${username} should exist`).toBeTruthy();
  }

  async verifyUserDataIntegrity(): Promise<void> {
    for (const user of usersSeed) {
      expect(user.username).toBeTruthy();
      expect(user.role).toMatch(/admin|customer/);
    }
  }
}
