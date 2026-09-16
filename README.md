# Playwright_TS_5x

Minimal Playwright TypeScript project (Playwright Test)

## Requirements
- Node.js LTS (16+ recommended)
- npm

## Setup
Install dev dependencies:

```bash
npm install
```

This project uses `@playwright/test` (declared in package.json as ^1.63.0).

## Running tests
- Run all tests:

```bash
npx playwright test
```

- Run only API smoke tests:

```bash
npx playwright test --grep="@api-smoke"
```

## Notes
- If TypeScript reports `Cannot find name 'process'`, install Node types and/or add a `tsconfig.json` with `types: ["node"]`.

```bash
npm install --save-dev @types/node
```

- The API client utilities are in `api/client/`. If you want strict types for request options, derive them from `APIRequestContext` method signatures (see code comments).

## Contact
If you want me to push this README to the remote, confirm and I'll commit & push it.
