# Framework Architecture

The framework is capability-driven:

- `tests/` contains only intent-level scenarios.
- `capabilities/` exposes UI, API, contract, database, and performance actions.
- `pages/`, `services/`, and `api-clients/` are implementation details used by capabilities.
- `domains/` owns business data models and rules.
- `core/fixtures/` wires capabilities into Playwright.
- `core/hooks/` captures lifecycle logs and metrics.
- `data/` owns builders, factories, fixtures, contracts, and seeds.
- `ai/` owns AI orchestration and healing helpers.
- `observability/` stores logs, metrics, reporter output, dashboards, and traces.

## Execution Lifecycle

1. Playwright loads `playwright.config.ts`.
2. Environment settings are read from `.env` or defaults.
3. Tests receive reusable capabilities from fixtures.
4. Hooks capture logs, console messages, network failures, and metrics.
5. Playwright writes HTML, JSON, Allure results, traces, screenshots, and video.
6. The report script creates `reports/test-report.md`.

## Rules

- Tests should not instantiate pages, services, or API clients.
- Tests should use capabilities.
- Database access belongs in `capabilities/database`.
- AI logic belongs in `ai/`.
- `test-specs/` is deprecated and intentionally unused.
