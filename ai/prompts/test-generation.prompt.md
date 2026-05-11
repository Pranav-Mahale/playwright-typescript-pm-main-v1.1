# AI Test Generation Prompt

Generate Playwright TypeScript tests that:

- Use `core/fixtures/test-fixtures.ts`.
- Interact only through `capabilities/`.
- Keep assertions explicit and user-visible.
- Avoid XPath and index-based selectors.
- Put generated tests in `tests/ai-generated/`.
