# Backend

Express.js REST API for the Pizza Delivery application.

## Includes
- JWT authentication and role checks
- User/admin routes
- MongoDB/Mongoose models
- Orders and inventory management
- Password reset email flow
- Scheduled low-stock alerts
- Database seed utility

## Run
```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

Do not commit your real `.env` file or credentials.
