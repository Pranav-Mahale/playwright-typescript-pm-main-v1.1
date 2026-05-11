import type { APIRequestContext, APIResponse } from '@playwright/test';
import { getEnvironmentConfig } from '@config/environment';

export class BaseApiClient {
  protected readonly apiBaseUrl = getEnvironmentConfig().apiBaseUrl;

  constructor(protected readonly request: APIRequestContext) {}

  protected get(endpoint: string): Promise<APIResponse> {
    return this.request.get(`${this.apiBaseUrl}${endpoint}`);
  }

  protected post(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.post(`${this.apiBaseUrl}${endpoint}`, { data });
  }
}
