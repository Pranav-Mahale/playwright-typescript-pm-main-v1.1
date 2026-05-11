import { test } from '@core/fixtures/test-fixtures';

test.describe('Performance - Basic thresholds', () => {
  test('posts API responds within threshold @performance', async ({ request, performance }) => {
    await performance.verifyApiLatency(request, '/posts/1', 5000);
  });

  test('login page loads within threshold @performance', async ({ page, performance }) => {
    await performance.verifyUiLoad(page, 8000);
  });
});
