import type { CreatePostRequest } from '@domains/post-domain';

export class PostBuilder {
  private payload: CreatePostRequest = {
    title: `automation-post-${Date.now()}`,
    body: 'Created by Playwright API capability',
    userId: 1
  };

  withTitle(title: string): this {
    this.payload.title = title;
    return this;
  }

  build(): CreatePostRequest {
    return { ...this.payload };
  }
}
