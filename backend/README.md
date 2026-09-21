# Backend

Express API for the Pizza Delivery application.

## Includes

- User and admin authentication
- JWT-based protected routes
- MongoDB models for users, admins, orders and inventory
- Pizza order creation and test payment confirmation
- Inventory updates
- Password reset email
- Low-stock email checks with node-cron

## Run

```bash
npm install
```

Copy `.env.example` to `.env`, configure the values, then run:

```bash
npm run seed
npm run dev
```

The API runs on port 5000 by default.
