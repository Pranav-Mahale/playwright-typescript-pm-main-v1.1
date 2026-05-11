import { test } from '@core/fixtures/test-fixtures';

test.describe('Database - Seed validation', () => {
  test('seeded users are valid @database', async ({ userDb }) => {
    await userDb.verifySeedUserExists('standard_user');
    await userDb.verifyUserDataIntegrity();
  });
});
