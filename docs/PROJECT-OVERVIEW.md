# Project Overview

## Pizza Delivery Web Application

This project is a full-stack pizza ordering application developed for the OIBSIP Web Development & Designing internship.

The codebase is split into a React frontend and a Node.js/Express backend. MongoDB is used for application data.

## Application flow

### Customer

1. Register or log in.
2. Build a pizza by selecting the available options.
3. Review the order summary.
4. Complete the test payment step.
5. View previous orders and their current status.

### Admin

1. Open the admin login.
2. Sign in with an admin account.
3. View inventory and stock levels.
4. Update inventory quantities.
5. Review customer orders.
6. Update order status.

## Frontend

The frontend uses React with React Router. API requests are handled through Axios.

Important areas:

- `src/pages/` — application screens
- `src/components/` — reusable route protection
- `src/context/` — authentication state
- `src/api/` — API client
- `src/App.js` — application routes
- `src/styles.css` — application styling

## Backend

The backend uses Express and MongoDB.

Important areas:

- `routes/` — authentication, orders and admin endpoints
- `models/` — MongoDB/Mongoose models
- `middleware/` — authentication middleware
- `config/` — database configuration
- `utils/` — mailer, scheduled job and seed utilities
- `server.js` — API entry point

## Development notes

The repository contains an `.env.example` file for backend configuration. Real environment files and secrets should stay local.

The payment implementation is intentionally a test/demo flow and is not a real payment gateway.

## Repository structure

```
frontend/
  public/
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
  .env.example
  server.js
```
