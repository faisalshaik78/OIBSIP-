# Frontend

React frontend for the Pizza Delivery Web Application.

## Main areas

- User registration and login
- Password reset screens
- Pizza builder and order summary
- Customer order dashboard
- Admin login
- Admin inventory and order dashboard
- Protected routes and authentication state

## Run locally

```bash
cd frontend
npm install
npm start
```

The development server uses port 3000 by default.

The frontend expects the backend API at `http://localhost:5000/api`, unless `REACT_APP_API_URL` is configured.

## Structure

```
src/
├── api/
├── components/
├── context/
├── pages/
├── App.js
├── index.js
└── styles.css
```
