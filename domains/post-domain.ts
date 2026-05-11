export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface PostResponse extends CreatePostRequest {
  id: number;
}
