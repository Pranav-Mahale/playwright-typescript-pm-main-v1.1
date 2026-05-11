import { BaseApiClient } from '@core/api/base-api-client';
import type { CreatePostRequest } from '@domains/post-domain';

export class PostsApiClient extends BaseApiClient {
  listPosts() {
    return this.get('/posts');
  }

  getPost(id: number) {
    return this.get(`/posts/${id}`);
  }

  createPost(payload: CreatePostRequest) {
    return this.post('/posts', payload);
  }
}
