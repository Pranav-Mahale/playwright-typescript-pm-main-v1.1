import { test } from '@core/fixtures/test-fixtures';

test.describe('Contract - Posts API', () => {
  test('post response matches JSON schema @contract', async ({ posts, postContract }) => {
    const post = await posts.verifyPostCanBeRead(1);
    postContract.validatePostResponse(post);
  });
});
