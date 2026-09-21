# Pizza Delivery — Full-Stack Web Application

A full-stack pizza ordering application built for the OIBSIP Web Development & Designing Level 3 task.

## Tech Stack
React.js • React Router • Axios • Node.js • Express.js • MongoDB/Mongoose • JWT • bcrypt • Nodemailer • node-cron

## Project Structure
```
OIBSIP-WebDev-L3-PizzaDelivery/
├── frontend/        # React customer/admin UI
├── backend/         # Express API, MongoDB models, auth and jobs
├── screenshots/     # GitHub-friendly UI previews
└── README.md
```

## Main Features
- Customer registration, login and protected routes
- Custom pizza builder with inventory-backed ingredients
- Test-mode payment flow and order tracking
- Separate admin login and dashboard
- Inventory management and automatic stock reduction
- Order status workflow: Received → In Kitchen → Delivery → Delivered
- Password reset email flow
- Scheduled low-stock email alerts

## Run Locally

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000`

Keep real credentials in `.env`; never commit secrets.

## Screenshots

### Customer UI
![Customer UI](screenshots/user-dashboard-preview.svg)

### Admin UI
![Admin UI](screenshots/admin-dashboard-preview.svg)

## Notes
The payment flow is configured for demonstration/test use and does not process real payments.

## Author
**Shaik Faisal**  
GitHub: https://github.com/faisalshaik78
