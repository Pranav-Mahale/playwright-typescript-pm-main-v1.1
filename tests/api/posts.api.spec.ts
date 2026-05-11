import { test, expect } from '@core/fixtures/test-fixtures';
import { PostBuilder } from '@data/builders/post-builder';

test.describe('API - Posts', () => {
  test('can read an existing post @api', async ({ posts }) => {
    const post = await posts.verifyPostCanBeRead(1);
    expect(post.userId).toBe(1);
  });

  test('can create a post @api', async ({ posts }) => {
    const payload = new PostBuilder().withTitle('enterprise playwright framework').build();
    const created = await posts.createPost(payload);
    expect(created.title).toBe(payload.title);
  });
});
