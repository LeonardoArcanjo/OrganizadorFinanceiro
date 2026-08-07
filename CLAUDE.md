# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

OrganizadorFinanceiro is a personal-finance REST API built with Express 5 and Mongoose (MongoDB). It exposes CRUD + search endpoints for four resources: expenses, credit card expenses, incomes, and investments. There is no frontend in this repo — it's API-only.

## Commands

- `npm run dev` — start the server with nodemon (loads `.env` via `--env-file`, entry point `server.js`)
- `npm test` — not implemented; currently just exits with an error. There is no test suite in this repo.
- There is no lint script defined in `package.json`, and no ESLint config file exists at the repo root, even though `eslint` is a devDependency.

### Running with Docker

`Dockerfile` builds a `node:alpine` image, installs deps, and runs `npm run dev`. `src/Context/DbConnect.js` connects to MongoDB at host `mongo` (i.e. it expects to run alongside a container named `mongo` on the same Docker network/compose file — there is no `docker-compose.yml` committed to this repo, so that must be supplied separately or the code adjusted for local, non-Docker MongoDB).

### Environment variables

Required in `.env` (git-ignored): `DATABASE_LOGIN`, `DATABASE_PASSWORD`. These are used to build the Mongo connection string in `src/Context/DbConnect.js` (`mongodb://<login>:<password>@mongo:27017/FinancialDB?authSource=admin`). The password is passed through `encodeURIComponent` to tolerate special characters.

## Architecture

ESM throughout (`"type": "module"` in `package.json`) — use `import`/`export`, not `require`.

Request flow: `server.js` → `src/app.js` (creates the Express app, connects to the DB, wires global JSON parsing and routes) → `src/routes/index.js` → per-resource router in `src/routes/*Routes.js` → controller in `src/Controllers/` → Mongoose model in `src/Context/`.

### Layer responsibilities

- **`src/Context/`** — despite the name, this holds Mongoose schemas and models (one file per resource), plus `DbConnect.js` for the connection itself. `CreditCardExpense.js` embeds `ExpenseSchema` from `Expense.js` as a subdocument (a credit card expense *is* an expense plus `bankName`/`installments`).
- **`src/Controllers/`** — one static class per resource (e.g. `ExpenseController`) with static methods for `getAll*`, `get*ById`, `search*`, `update*`, `insert*`, `delete*`. All methods follow the same try/catch → `next(error)` pattern; there's no shared base controller.
- **`src/routes/`** — one Express `Router` per resource, mounted together in `src/routes/index.js`. Routes are intentionally thin: just wire HTTP verb + path to controller method(s).
- **`src/Errors/`** — a small error class hierarchy: `ErrorBase` (has `.sendResponse(res)`, defaults to 500) → `ErrorRequest` (400) → `ErrorValidation` (400, formats a Mongoose `ValidationError` into a joined message) and `NotFound` (404). Throw/`next()` these instead of manually calling `res.status().json()` in controllers.
- **`src/Middleware/ErrorHandler.js`** — the single centralized error-handling middleware (registered last in `app.js`). It maps `mongoose.Error.CastError` → `ErrorRequest`, `mongoose.Error.ValidationError` → `ErrorValidation`, any `ErrorBase` instance → itself, and anything else → a generic 500 `ErrorBase`.
- **`src/Models/Constants.js`** — shared HTTP status code constants and `PORT`. Use these instead of hardcoding status numbers.

### The list/search + pagination pattern (non-obvious)

For "get all" and "search" endpoints, the controller does **not** send the response itself. It builds a Mongoose query (e.g. `expense.find()` or `expense.find(searchFilter)`, *not awaited*), assigns it to `req.response`, and calls `next()`. The route then chains a second middleware, `src/Middleware/Pagination.js` (`paginator`), which reads `req.response`, applies `.find().sort().skip().limit().exec()` using `range`/`page`/`sorting` query params, and sends the final JSON response.

Because of this, any new "list" or "search" endpoint must follow the same two-step shape (controller sets `req.response` to an unexecuted query + `next()`; route appends `paginator`) rather than resolving and responding directly in the controller.

`sorting` query param format is `field:direction`, e.g. `_id:-1` (default), split on `:` in `paginator`.

### Search query building

Each controller has a local (non-exported) `searchQueryHandler(params)` function that turns query-string params into a Mongoose filter object (regex, case-insensitive `name`/`category` matches; `$gte`/`$lte` range filters for `minValue`/`maxValue` or `minDate`/`maxDate`). `CreditCardExpenseController`'s version filters on the embedded `expense.*` subdocument fields (`expense.name`, `expense.category`, `expense.date`).

### Adding a new resource

To add a new resource, mirror the existing four: a schema/model in `src/Context/`, a static controller class in `src/Controllers/` implementing the six standard methods (`getAll*`, `get*ById`, `search*`, `update*`, `insert*`, `delete*`) plus a local `searchQueryHandler`, a router in `src/routes/` chaining `paginator` after the list/search controller methods, and register that router in `src/routes/index.js`.
