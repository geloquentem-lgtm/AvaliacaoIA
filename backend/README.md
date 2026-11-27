# AvaliacaoFinalNodeAPI

## Requisitos

- Node.js 20.6 or newer
- PostgreSQL

Copy `.env.example` to `.env` and configure `DB_HOST`, `DB_PORT`, `DB_NAME`,
`DB_USER`, `DB_PASSWORD`, `DB_SSL`, and comma-separated `FRONTEND_ORIGINS`. The database
credentials are read from the environment and must not be committed.

## Executar

```sh
npm ci
npm run dev
```

On startup, Sequelize creates the catalog tables without dropping data and
inserts the seven contract products if they are missing.

## Endpoints

- `GET /api/v1/categories`
- `GET /api/v1/products`
- `GET /api/v1/products?categoryId=hamburgueres&search=bacon`
- `GET /api/v1/products/:id`

The API is read-only. Cart operations and checkout are simulated in the
front-end; orders are not stored or transmitted.