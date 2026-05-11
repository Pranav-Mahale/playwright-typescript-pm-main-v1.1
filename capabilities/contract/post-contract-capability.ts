import Ajv from 'ajv';
import { expect } from '@playwright/test';
import type { PostResponse } from '@domains/post-domain';
import postSchema from '@data/contracts/post.schema.json';

export class PostContractCapability {
  private readonly ajv = new Ajv({ allErrors: true });

  validatePostResponse(payload: PostResponse): void {
    const validate = this.ajv.compile(postSchema);
    const valid = validate(payload);
    expect(valid, JSON.stringify(validate.errors, null, 2)).toBeTruthy();
  }
}
