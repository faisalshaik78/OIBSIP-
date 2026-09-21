# Backend

Express API for the Pizza Delivery Web Application.

## Main responsibilities

- User and admin authentication
- JWT-protected routes
- MongoDB models for users, admins, orders and inventory
- Pizza order creation
- Test payment confirmation
- Inventory updates
- Password reset email
- Low-stock email checks with node-cron

## Run locally

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and configure the local values.

Then run:

```bash
npm run seed
npm run dev
```

The API uses port 5000 by default.

## Structure

```
backend/
├── config/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env.example
└── server.js
```

Keep real credentials and environment values out of GitHub.
