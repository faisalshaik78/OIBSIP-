# Pizza Delivery Web Application

A full-stack pizza ordering application built as part of the OIBSIP Web Development & Designing internship.

The project includes separate customer and admin workflows, with a React frontend and Node.js/Express backend connected to MongoDB.

## Features

### Customer

- Registration and login
- Password reset flow
- Step-by-step pizza builder
- Base, sauce, cheese, and vegetable selection
- Order summary
- Demo checkout flow
- Order history
- Order status tracking

### Admin

- Admin login
- Inventory dashboard
- Stock updates
- Low-stock email alerts
- Order list and progress updates

## Tech Stack

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
- JWT
- bcryptjs
- Nodemailer
- node-cron

## Project Structure

```text
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

## Run Locally

### Backend

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`, then add the required MongoDB, JWT, and email configuration.

Start the backend:

```bash
npm run seed
npm run dev
```

The backend uses port `5000` by default.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend uses port `3000` by default.

## Important Notes

- The payment flow is a demo and does not process real payments.
- Inventory and order updates use API polling.
- Starter data is provided for local development.
- Never commit real environment variables or secrets.

## What I Practiced

- Building a full-stack React application
- Creating REST APIs with Express
- Connecting an application to MongoDB
- Implementing authentication and protected routes
- Managing customer and admin workflows
- Working with email notifications and scheduled tasks

## Author

**SHAIK FAISAL**

[GitHub](https://github.com/faisalshaik78)
