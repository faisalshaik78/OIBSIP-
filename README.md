# Pizza Delivery Web Application

A full-stack pizza ordering project developed as part of the **OIBSIP Web Development & Designing – Level 3** internship task.

The project focuses on a practical ordering workflow with customer authentication, pizza customization, order management, inventory handling, and an admin workflow.

## Project at a glance

| Area | Details |
|---|---|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Email | Nodemailer |
| Scheduled jobs | node-cron |
| Project type | Full-stack web application |

## Key features

- Customer registration and login
- Protected customer and admin routes
- Custom pizza builder
- Ingredient and inventory management
- Order creation and order tracking
- Admin order-status workflow
- Password-reset email flow
- Low-stock notification job
- Test/demo payment flow

## Repository structure

```text
OIBSIP-/
├── OIBSIP-WebDev-L3-PizzaDelivery.zip   # Project source archive
├── frontend/
│   └── README.md                         # Frontend documentation
├── backend/
│   └── README.md                         # Backend documentation
└── README.md
```

> **Repository note:** The current GitHub repository stores the application source as a ZIP archive. The `frontend/` and `backend/` directories currently contain documentation only. They are intentionally not presented as extracted source code.

## Running the project

The runnable application is packaged in:

`OIBSIP-WebDev-L3-PizzaDelivery.zip`

Extract the archive locally, then follow the setup instructions in the project's frontend/backend folders.

The documented development setup uses:

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev

# Frontend
cd frontend
npm install
npm start
```

Typical local endpoints:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

Do not commit real API keys, database credentials, JWT secrets, email credentials, or production configuration.

## Technical highlights

### Authentication
JWT-based authentication is used for protected application routes, with bcrypt used for password handling.

### Ordering
Customers can build a pizza, submit an order, and track the order through defined status stages.

### Administration
The application includes a separate admin workflow for managing orders and inventory.

### Inventory
Ingredients are connected to inventory logic, including stock reduction and low-stock notification handling.

### Email and scheduled tasks
Nodemailer supports email workflows, while node-cron is used for scheduled low-stock checks.

## What I worked on

This project demonstrates practical experience with:

- React component and route-based UI development
- REST API integration
- Node.js and Express.js backend development
- MongoDB/Mongoose data handling
- Authentication and role-based access
- CRUD operations
- Frontend/backend integration
- Basic application security practices
- Debugging and local development workflows

## Future improvements

- Extract the source archive into the repository so the code can be reviewed directly on GitHub
- Add automated frontend/backend tests
- Add CI checks with GitHub Actions
- Add a live deployment link
- Add real captured application screenshots
- Add API documentation

## Internship

**OIBSIP — Web Development & Designing Level 3**

This repository contains the pizza-delivery project submission and supporting documentation.

## Author

**Shaik Faisal**

- GitHub: https://github.com/faisalshaik78
- LinkedIn: https://www.linkedin.com/in/shaik-faisal-0176b9228
