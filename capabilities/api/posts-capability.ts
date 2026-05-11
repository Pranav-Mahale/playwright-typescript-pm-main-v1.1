import { expect, type APIRequestContext } from '@playwright/test';
import { PostsApiClient } from '@api-clients/posts-api-client';
import type { CreatePostRequest, PostResponse } from '@domains/post-domain';
import { expectStatus } from '@core/utils/assertions';

export class PostsCapability {
  private readonly client: PostsApiClient;

  constructor(request: APIRequestContext) {
    this.client = new PostsApiClient(request);
  }

  async verifyPostCanBeRead(id: number): Promise<PostResponse> {
    const response = await this.client.getPost(id);
    await expectStatus(response, 200);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = (await response.json()) as PostResponse;
    expect(body.id).toBe(id);
    expect(body.title).toBeTruthy();
    return body;
  }

  async createPost(payload: CreatePostRequest): Promise<PostResponse> {
    const response = await this.client.createPost(payload);
    await expectStatus(response, 201);
    const body = (await response.json()) as PostResponse;
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
    expect(body.id).toBeTruthy();
    return body;
  }
}
