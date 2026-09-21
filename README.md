# Pizza Delivery Web Application

A full-stack pizza ordering application built for the OIBSIP Web Development & Designing internship.

The project has separate customer and admin areas. Customers can create an account, build a pizza, place an order, use the test payment flow, and check order status. Admins can manage inventory and update order status.

## Tech stack

- React.js
- React Router
- Axios
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- node-cron

## Project structure

```
frontend/
  src/
    api/
    components/
    context/
    pages/
    App.js
    index.js
    styles.css

backend/
  config/
  middleware/
  models/
  routes/
  utils/
  server.js
```

## Main features

### Customer
- Registration and login
- Forgot and reset password
- Pizza builder for base, sauce, cheese and vegetables
- Order summary
- Test-mode payment confirmation
- Order history and status updates

### Admin
- Separate admin login
- Inventory view and stock updates
- Low-stock highlighting
- Order list
- Order status updates

## Run locally

### Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and add your MongoDB and email settings.

Then:

```bash
npm run seed
npm run dev
```

The API runs on port 5000 by default.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The React app runs on port 3000 by default.

## Notes

The payment flow in this project is a test/demo flow. It creates a test payment id instead of processing a real payment.

Order status is refreshed by polling the API every 8 seconds.

The seed script creates the initial admin account and starter inventory for local testing.

## Author

Shaik Faisal
