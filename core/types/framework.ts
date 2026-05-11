export type TraceMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
export type VideoMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
export type ScreenshotMode = 'off' | 'on' | 'only-on-failure';

export interface TestRunMetric {
  name: string;
  status: 'passed' | 'failed' | 'skipped' | 'timedOut' | 'interrupted';
  durationMs: number;
  browserName: string;
  retry: number;
}
