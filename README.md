# Pizza Delivery Web Application

A full-stack pizza ordering application built as part of the OIBSIP Web Development & Designing internship.

This project includes a customer-facing ordering flow and an admin dashboard for inventory and order management. It is designed to be easy to run locally, with a Node.js + Express backend and a React frontend.

## Features

### Customer side
- User registration and login
- Password reset flow
- Step-by-step pizza builder
- Base, sauce, cheese, and vegetable selection
- Order summary before checkout
- Demo payment flow
- Order history and live status tracking

### Admin side
- Separate admin login
- Inventory dashboard with stock updates
- Low-stock alerts via email automation
- Order list and progress updates

## Tech stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs
- Nodemailer
- node-cron

## Project structure

```bash
OIBSIP-/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── docs/
├── .gitignore
├── README.md
└── package-lock.json
```

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/faisalshaik78/OIBSIP-.git
cd OIBSIP-
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` and add your MongoDB, JWT, and email settings.

Then run:

```bash
npm run seed
npm run dev
```

The backend runs on port `5000` by default.

### 3. Set up the frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm start
```

The frontend runs on port `3000` by default.

## Notes

- The payment step is a demo/test flow and does not process a real payment.
- Inventory and order updates are refreshed through API polling.
- The app uses a seeded admin account and starter stock values for local development.
- Real environment variables and secrets should never be committed to GitHub.

## Author

Shaik Faisal

GitHub: https://github.com/faisalshaik78
