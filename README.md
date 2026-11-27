# Screenshot Exact Match

This project was built with [Lovable](https://lovable.dev) and remains linked
to the [Lovable editor](https://lovable.dev/projects/0272b45d-f439-4f29-8382-5e2714843aa2).

The canonical application copies live in `frontend/` and `backend/`. The
original root-level frontend files remain untouched as a compatibility
snapshot; `documentos/` and `prompts/` remain at the repository root. Make
front-end code changes in `frontend/`; root npm scripts delegate to that copy.

## Front-end

```sh
npm --prefix frontend install
npm run dev:frontend
```

Set `VITE_API_BASE_URL` in `frontend/.env` to the API base URL. The example
value is `http://localhost:3000/api/v1`.

## Back-end

Copy `backend/.env.example` to `backend/.env`, fill in the PostgreSQL settings,
and set `FRONTEND_ORIGINS` to the front-end origin(s). Then run:

```sh
npm --prefix backend ci
npm run dev:backend
```

The public catalog endpoints are `GET /api/v1/categories`,
`GET /api/v1/products`, and `GET /api/v1/products/:id`. The cart and simulated
checkout remain in front-end state; no order endpoint is implemented.

## Validation

```sh
npm test
npm run lint
npm run build
npm run test:backend
```
