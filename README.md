# Al-Zahraa UI (جمعية الزهراء الثقافية)

React frontend for Al-Zahraa Cultural Association. One app serves two audiences:

- **Public website** (`/`): home, news, activities, about, content details. No login needed.
- **Internal management** (`/admin`): donors, incomes, expenses, maintenance, public content, financial reports and user creation. Requires login.

The backend is the Spring Boot project `money.manegment` (REST API under `/api`).

## Getting started

Requirements: Node 18+ and a running backend.

```bash
npm install
cp .env.example .env.local   # then adjust the values
npm start                    # http://localhost:3000
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `REACT_APP_API_URL` | `http://localhost:8080/ZahraaAPI/api` | API base URL, including `/api`. When the backend runs from `mvnw spring-boot:run` (no context path), use `http://localhost:8080/api`. |
| `REACT_APP_CURRENCY` | `EUR` | ISO currency code used to format amounts. |

These values are baked in at build time, so rebuild after changing them.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Development server with hot reload |
| `npm test` | Jest + Testing Library (watch mode; add `--watchAll=false` for a single run) |
| `npm run build` | Production build in `build/` |

## Project structure

```
src/
  api/            One module per backend resource, all built on client.js (axios + auth + errors)
  auth/           Session storage, JWT decoding, AuthProvider, RequireAuth route guard
  components/ui/  Shared UI kit: Button, fields, Modal/ConfirmDialog, DataTable, toasts, cards
  config/env.js   Build-time configuration
  constants/      Arabic labels for backend enums, month names
  hooks/          useAsync, useEntityForm (create/edit forms), useDeleteConfirm, useDocumentTitle
  features/
    public/       Public pages and their components
    admin/        Admin layout, dashboard and one folder per module (list page + form page)
    auth/         Login page
  layout/         Public site layout
  utils/          Money/date formatting helpers
```

### Adding an admin module

1. Add `src/api/<thing>Service.js` with `fetch/fetchOne/create/update/delete` on `client`.
2. Create `features/admin/<thing>/<Thing>Page.jsx` (list, using `DataTable` + `useDeleteConfirm`) and `<Thing>FormPage.jsx` (using `useEntityForm` + `FormShell`).
3. Register it in `App.js` with `crudRoutes('<thing>', ListPage, FormPage)` and add a sidebar entry in `features/admin/AdminLayout.jsx`.

## Authentication and roles

- Login returns a JWT. It is stored in `localStorage` and sent as `Authorization: Bearer …`.
- The token's `exp` is checked on startup and the user is logged out automatically when it expires (the backend sets this to 1 hour with `jwt.expiration`). Any `401` from the API also ends the session and sends the user to the login page.
- `ADMIN` users can create accounts at `/admin/users`. `USER` accounts manage finances and content. The backend enforces the same rule: `/api/auth/register` requires `ADMIN`.

## Deployment

Run `npm run build` and serve the `build/` folder from any static host. Configure the host to fall back to `index.html` for unknown paths so client-side routes such as `/admin/donors` work on refresh. The backend must allow the site's origin (CORS) and serve uploaded files at `/api/public/uploads/**`.
