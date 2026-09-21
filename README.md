# Pizza Delivery Web Application

A full-stack pizza ordering application built as part of the OIBSIP Web Development & Designing internship.

The application has two sides: a customer area for creating pizzas and placing orders, and an admin area for managing inventory and updating order progress.

## What the project includes

### Customer side
- User registration and login
- Forgot-password and reset-password flow
- Step-by-step pizza builder
- Base, sauce, cheese and vegetable selection
- Order summary before checkout
- Test-mode payment confirmation
- Order history and status tracking

### Admin side
- Separate admin login
- Inventory dashboard
- Stock updates
- Low-stock indicators
- Customer order list
- Order status updates

## Tech stack

**Frontend**
- React.js
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- Nodemailer
- node-cron

## Project structure

```
OIBSIP-/
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.js
│       ├── index.js
│       └── styles.css
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   └── server.js
│
├── .gitignore
└── README.md
```

## Getting started

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

Create a `.env` file from `.env.example` and add your local MongoDB, JWT and email configuration.

Start the backend:

```bash
npm run seed
npm run dev
```

The API uses port **5000** by default.

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

The React development server uses port **3000** by default.

## Important notes

- The payment step is a **test/demo flow** and does not process a real payment.
- Order status is refreshed by polling the API every 8 seconds.
- The seed script adds the initial admin account and starter inventory for local development.
- Do not commit your real `.env` file or application secrets. The repository ignores environment files.

## Project layout

The frontend is kept separate from the backend so each part can be installed and developed independently. Backend routes are grouped by authentication, orders and admin operations, while MongoDB models are kept in the `models` directory.

## Author

**Shaik Faisal**

GitHub: https://github.com/faisalshaik78
