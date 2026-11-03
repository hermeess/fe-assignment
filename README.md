# Meridian Banking

- Deployed: [https://friendly-gumption-247b8b.netlify.app/](https://friendly-gumption-247b8b.netlify.app/)
- Run locally: `npm ci && npm run dev`
- Node.js: 22

## Project structure

- `src/api/` — API client, query functions, dashboard data hooks, and transfer mutations.
- `src/components/` — Shared UI and feature components. Larger components are colocated in folders with their CSS Modules; transfer steps and transaction items are split into focused components.
- `src/constants/` — API paths, query keys, and transfer constants.
- `src/hooks/` — Reusable hooks, including the transfer flow and debounced values.
- `src/pages/` — Dashboard page composition.
- `src/providers/` — Redux, TanStack Query, preferences, and modal providers.
- `src/store/` — Redux store and persisted theme and segment preferences.
- `src/types/` — Shared TypeScript types and enums.
- `src/mocks/` and `mock-api/` — MSW browser handlers and the shared in-memory mock API.
- `e2e/` — Playwright end-to-end coverage.

## Decisions and trade-offs

- TanStack Query owns remote API state and caching. Redux Persist stores user preferences such as theme and customer segment.
- Transfer form values are managed locally through a transfer-specific hook and React Hook Form. The transfer draft only exists while the dialog is open, so it does not need to live in the global Redux store.
- Zod validates the transfer form and recipient details. Amount input accepts digits and a decimal point, and normalizes whole amounts to two decimal places.
- Ant Design provides the modal, form controls, select, and dashboard skeleton. CSS Modules scope component styles, while shared design tokens remain global.
- Search is debounced and result areas reserve space to reduce layout shifts. The transfer dialog is code-split and prefetched when the user shows intent to open it.
- The app is deployed as static files. MSW starts before the app renders and intercepts API requests in both development and production; the mock database resets on page reload.

## Loading, empty and error states

- The dashboard uses Ant Design skeletons while its data is loading.
- Empty accounts and transaction results have dedicated empty states.
- API failures show a retry action and the API error code.
- Open **Demo tools** in the bottom-right corner to preview the dashboard error or empty state. Choose **Reset demo data** to return to the normal dashboard.

## Tests

- Vitest checks dashboard rendering and money/date formatting.
- The Playwright end-to-end test opens the transfer flow, checks amount formatting, completes a transfer, and verifies the updated balance and transaction.
- GitHub Actions runs formatting checks, lint, typecheck, unit tests, the production build, and the Playwright test.

Run the local checks with:

```bash
npm run check
npm run build
npm run test:e2e
```

## AI use

I used OpenAI Codex during implementation for scaffolding, refactoring, styling, test setup, and deployment troubleshooting. I reviewed and changed its suggestions where they did not fit the assignment:

- Adding debouncing, minimising CLS, prefetching on hover, UX.
- Kept the transfer draft local after considering a global store; the draft is only used inside the transfer dialog.
- Restored production MSW startup after a bundle-size change had limited it to development; the deployed static app depends on the mock worker for API requests.

## Not done / known issues

- The API is a mock, and transfer data is held in memory. A page reload restores the seed balances and transactions; no real payment is sent.
- The dashboard and transfer flow are a single-page experience and do not use a client-side router.
