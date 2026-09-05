
OIBSIP — Web Development & Designing — Level 3
Task 1 · Pizza Delivery Full-Stack Application
Intern: Shaik Faisal
Track: Web Development & Designing (Level 3)
Stack: React.js · Node.js/Express · MongoDB · JWT auth · Razorpay (test mode) · node-cron + Nodemailer

What this is
A full-stack pizza ordering platform with two separate roles:

Users register, log in, build a custom pizza (base → sauce → cheese →
vegetables), pay through a Razorpay test-mode checkout, and track their
order's live status.
Admins log in separately, manage ingredient inventory, and move orders
through the fulfilment pipeline (Order Received → In Kitchen → Sent to
Delivery → Delivered). A scheduled job emails the admin automatically when
any ingredient's stock drops below a configurable threshold.
Project structure
OIBSIP-WebDev-L3-PizzaDelivery/
├── backend/          # Express API, MongoDB models, auth, cron job
│   ├── models/        # User, Admin, Order, Inventory
│   ├── routes/         # auth, adminAuth, orders, admin
│   ├── middleware/     # JWT verification + role guard
│   ├── utils/           # mailer, cron job, DB seed script
│   └── server.js
└── frontend/          # React app (pizza builder, admin dashboard)
    └── src/
        ├── pages/       # Register, Login, OrderDashboard, AdminDashboard, ...
        ├── context/      # AuthContext (session state)
        └── api/           # axios client
Setup
1. Backend

cd backend
npm install
cp .env.example .env      # fill in MongoDB URI, JWT secret, email creds
npm run seed               # creates one admin account + starter inventory
npm run dev                 # starts the API on http://localhost:5000
Seeded admin login: admin@pizza.com / Admin@123 (change this after first login in a real deployment).

2. Frontend

cd frontend
npm install
npm start                   # starts on http://localhost:3000
Feature checklist mapping
User side

 Registration (email + password, hashed with bcrypt)
 Login with JWT-based authorisation
 Forgot-password flow (emails a time-limited reset link)
 Dashboard shows live inventory-backed pizza options
 Custom pizza builder: base → sauce → cheese → vegetables (multi-select)
 Order summary page before payment
 Razorpay checkout — test mode: a "Pay Now (Test Mode)" button
simulates a successful Razorpay payment server-side (see note below)
 Real-time-ish order status on the user dashboard (polls every 8s):
Order Received → In Kitchen → Sent to Delivery → Delivered
Admin side

 Separate admin login (no public registration route — created via seed script)
 Inventory dashboard: stock of bases, sauces, cheeses, vegetables
 Stock automatically decremented after each paid order
 Manual stock update per item
 Automated low-stock email alert via node-cron (runs every 10 minutes,
configurable threshold via LOW_STOCK_THRESHOLD in .env)
 Order management panel: view all orders, advance status per order
 Status changes are visible on the user's dashboard via polling
About the Razorpay integration
This submission implements Razorpay in test mode as a simulated
checkout: clicking "Pay Now" calls POST /api/orders/:id/pay, which marks
the order paid, generates a mock rzp_test_... payment id, and decrements
inventory — matching the task brief's requirement that "clicking Success
confirms the order."

To wire in a real Razorpay test-mode checkout instead:

Add your test keys to .env (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET).
On the backend, use the razorpay npm package to create an order via razorpay.orders.create() inside the /pay route, and return the order_id to the frontend.
On the frontend, load Razorpay's Checkout.js script and open it with that order_id; on success, POST the returned razorpay_payment_id and razorpay_signature to a verification endpoint that checks the signature with RAZORPAY_KEY_SECRET before marking the order paid.
Razorpay's own quickstart guide covers this exact flow if you want to extend it.

Notes on scope decisions
Email "verification" on registration is simplified to a welcome email
rather than a full verify-by-link flow, since the task brief's feature
checklist emphasizes the registration/login/dashboard flow itself.
The order-status "real-time" requirement is implemented via short-interval
polling (8s) rather than WebSockets, which satisfies the checklist's
"polling or WebSockets" option explicitly listed in the task card.
Demo video reminder
Per the internship guidelines, your demo video must open with a 2-second
title card showing your full name, track (Web Development &
Designing), and task title (Pizza Delivery Full-Stack Application),
then show the app working end-to-end: register → build a pizza → pay →
watch status update after the admin advances it.