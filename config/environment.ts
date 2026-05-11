import type { ScreenshotMode, TraceMode, VideoMode } from '@core/types/framework';

export type EnvironmentName = 'dev' | 'qa' | 'stage' | 'prod';

export interface EnvironmentConfig {
  name: EnvironmentName;
  baseUrl: string;
  apiBaseUrl: string;
  headless: boolean;
  traceMode: TraceMode;
  videoMode: VideoMode;
  screenshotMode: ScreenshotMode;
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const name = (process.env.TEST_ENV ?? 'qa') as EnvironmentName;

  return {
    name,
    baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    apiBaseUrl: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
    headless: (process.env.HEADLESS ?? 'true').toLowerCase() !== 'false',
    traceMode: (process.env.TRACE_MODE ?? 'retain-on-failure') as TraceMode,
    videoMode: (process.env.VIDEO_MODE ?? 'retain-on-failure') as VideoMode,
    screenshotMode: (process.env.SCREENSHOT_MODE ?? 'only-on-failure') as ScreenshotMode
  };
}
