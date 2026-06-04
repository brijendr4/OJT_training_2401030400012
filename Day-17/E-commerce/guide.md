# Fashion & Freedom — Complete Developer Guide

> A full-stack e-commerce application built with **React 19 + Vite**, **Node.js + Express 5**, **MongoDB**, and optional **Redis caching**.
>
> **v2.1** — Includes security hardening, rate limiting, server-side price validation, cart persistence, order history page, 404 page, toast notifications, and accessibility improvements.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Project Structure](#2-project-structure)
3. [Environment Setup](#3-environment-setup)
4. [Backend Setup](#4-backend-setup)
5. [Frontend Setup](#5-frontend-setup)
6. [Running the Application](#6-running-the-application)
7. [API Reference](#7-api-reference)
8. [Development Workflow](#8-development-workflow)
9. [Production Build & Deployment](#9-production-build--deployment)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Prerequisites

Install the following tools before you begin.

| Tool | Minimum Version | Download |
|------|----------------|---------|
| Node.js | v18.0.0+ | https://nodejs.org |
| npm | v9.0.0+ (comes with Node.js) | — |
| MongoDB | v6.0+ (local) OR free Atlas cloud | https://mongodb.com/try/download/community |
| Git | Latest | https://git-scm.com |
| Redis | Optional | https://redis.io/download |

> **Note:** Redis is entirely optional. If it is not installed or not running, the app automatically runs in "DB-only mode" — all features work, just without caching.

> **Note:** You do not need to install MongoDB locally. A free MongoDB Atlas cloud cluster works perfectly. See [Setting Up MongoDB Atlas](#setting-up-mongodb-atlas) below.

---

## 2. Project Structure

```
E-commerce/
├── backend/                        # Node.js + Express API server
│   ├── .env                        # Environment variables (DO NOT commit)
│   ├── .env.example                # Template — safe to commit
│   ├── .gitignore                  # Excludes .env and node_modules
│   ├── package.json
│   └── src/
│       ├── index.js                # Server entry point (helmet, cors, rate limiting)
│       ├── seed.js                 # Database seeder script
│       ├── controllers/
│       │   ├── authController.js   # Signup, Login, Me logic
│       │   ├── productController.js # Product list & detail (with regex injection protection)
│       │   └── orderController.js  # Order creation (server-side price verification)
│       ├── lib/
│       │   └── redis.js            # Redis client with graceful fallback
│       ├── middleware/
│       │   ├── auth.js             # JWT authentication middleware
│       │   └── errorHandler.js     # Global error handler middleware
│       ├── models/
│       │   ├── User.js             # User schema (email validation, role field)
│       │   ├── Product.js          # Product schema (indexes, soft-delete flag)
│       │   └── Order.js            # Order schema (compound indexes, required fields)
│       └── routes/
│           ├── auth.js             # Auth routes (rate-limited)
│           ├── products.js         # Product routes
│           └── orders.js           # Order routes
│
├── frontend/                       # React 19 + Vite + TailwindCSS v4
│   ├── .env                        # Local env vars (DO NOT commit)
│   ├── .env.example                # Template — safe to commit
│   ├── .gitignore
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                 # Routes (incl. /orders + 404 catch-all) + Toaster
│       ├── index.css               # Neumorphic design system
│       ├── data/
│       │   ├── constants.js        # Shared constants (testimonials, features, keys)
│       │   └── products.js         # (Legacy — unused, kept for reference)
│       ├── lib/
│       │   └── api.js              # API client (uses VITE_API_URL env var)
│       ├── context/
│       │   ├── AuthContext.jsx     # Authentication state
│       │   └── CartContext.jsx     # Cart state (persisted to localStorage)
│       └── components/
│           ├── Navbar.jsx          # Nav with My Orders link + accessibility fixes
│           ├── Footer.jsx          # Footer with toast newsletter + correct social icons
│           ├── Home.jsx            # Homepage (uses constants, has error state)
│           ├── TrendsSlider.jsx    # Auto-rotating hero carousel
│           ├── CategoryBar.jsx     # Category filter (correct icons + aria-pressed)
│           ├── ProductCard.jsx     # Product card (toast on add, aria labels)
│           ├── ProductsPage.jsx    # Products listing page
│           ├── ProductDetail.jsx   # Single product detail page
│           ├── CartPage.jsx        # Shopping cart
│           ├── Checkout.jsx        # Checkout (accessible labels, View Orders on success)
│           ├── Login.jsx           # Sign-in (accessible, toast, autoComplete)
│           ├── Signup.jsx          # Registration (accessible, toast, autoComplete)
│           ├── OrdersPage.jsx      # Order history with expandable cards ← NEW
│           └── NotFound.jsx        # 404 page ← NEW
│
└── guide.md                        # This file
```

---

## 3. Environment Setup

### 3.1 Clone or Extract the Project

If you received this project as a ZIP file:

```bash
# Windows PowerShell — extract to C:\projects
mkdir C:\projects
# Then right-click the ZIP → Extract All → choose C:\projects
```

If you are cloning from a Git repository:

```bash
git clone <repository-url> C:\projects\E-commerce
cd C:\projects\E-commerce
```

### 3.2 Create the Backend Environment File

The backend requires a `.env` file in the `backend/` folder.

1. Open `backend/.env` (it already exists with default values).
2. Update the values as described below.

```env
# === DATABASE ===
MONGODB_URI=mongodb://localhost:27017/ecommerce
# For Atlas: MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/ecommerce?...

# === AUTHENTICATION ===
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_strong_random_secret_here

# === SERVER ===
PORT=5000
NODE_ENV=development

# === CORS — your frontend URL (no trailing slash) ===
FRONTEND_URL=http://localhost:5173

# === REDIS (optional) ===
# REDIS_URL=redis://127.0.0.1:6379
```

Also create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> **Security Warning:** Never commit your `.env` file to Git. Add `backend/.env` to your `.gitignore`.

---

### Setting Up MongoDB Atlas

Follow these steps if you prefer a free cloud database over installing MongoDB locally.

**Step 1 — Create an Atlas account**
Go to https://mongodb.com/atlas and click **Try Free**. Sign up or log in.

**Step 2 — Create a free cluster**
- Click **Build a Database**
- Choose **M0 Free** tier
- Select any cloud provider and region close to you
- Click **Create**

**Step 3 — Create a database user**
- Go to **Security → Database Access**
- Click **Add New Database User**
- Set a username and a strong password (save these — you will need them)
- Set role to **Read and write to any database**
- Click **Add User**

**Step 4 — Allow network access**
- Go to **Security → Network Access**
- Click **Add IP Address**
- Click **Allow Access From Anywhere** (adds `0.0.0.0/0`)
- Click **Confirm**

**Step 5 — Get your connection string**
- Go to **Deployment → Database**
- Click **Connect** on your cluster
- Choose **Drivers** → Node.js
- Copy the connection string. It looks like this:
  ```
  mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  ```

**Step 6 — Update your `.env`**
Paste the connection string into `backend/.env` as `MONGODB_URI`. Make sure to:
- Replace `<username>` and `<password>` with your database user credentials
- Add `/ecommerce` before the `?` to specify the database name:
  ```
  MONGODB_URI=mongodb+srv://john:mypassword@cluster0.xxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
  ```

---

## 4. Backend Setup

Open a terminal and follow these steps.

### Step 1 — Install dependencies

```bash
cd E-commerce/backend
npm install
```

You should see npm download and install all packages listed in `package.json`.

### Step 2 — Start MongoDB (local only)

Skip this step if you are using MongoDB Atlas.

```bash
# Windows — start as a service (if installed as a service)
net start MongoDB

# Or run mongod directly (replace the path if your data directory is different)
mongod --dbpath "C:\data\db"
```

### Step 3 — Seed the database

This populates MongoDB with 8 sample fashion products.

```bash
# Make sure you are inside the backend/ folder
cd E-commerce/backend
npm run seed
```

Expected output:

```
✅ Connected to MongoDB
🗑️  Cleared existing products
🌱 Seeded 8 products
🧹 Cleared Redis products cache
✅ Done. Disconnected.
```

> Run `npm run seed` again any time you want to reset the product data to its defaults.

### Step 4 — Start the backend server

```bash
cd E-commerce/backend
npm run dev
```

Expected output:

```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

The server watches for file changes and restarts automatically (Node.js `--watch` flag).

> If you see `⚠️ Could not connect to Redis`, that is fine — the app continues to work without caching.

---

## 5. Frontend Setup

Open a **second terminal window** and follow these steps.

### Step 1 — Install dependencies

```bash
cd E-commerce/frontend
npm install
```

### Step 2 — Start the development server

```bash
cd E-commerce/frontend
npm run dev
```

Expected output:

```
  VITE v8.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open **http://localhost:5173** in your browser.

---

## 6. Running the Application

You need **two terminals running simultaneously**:

| Terminal | Directory | Command | URL |
|----------|-----------|---------|-----|
| Terminal 1 | `backend/` | `npm run dev` | http://localhost:5000 |
| Terminal 2 | `frontend/` | `npm run dev` | http://localhost:5173 |

### Verification Checklist

Once both servers are running, confirm each feature works:

- [ ] **Homepage** — Visit `http://localhost:5173`. You should see the hero slider, product cards, testimonials.
- [ ] **Product listing** — Click **Collections** in the navbar. Products load from the API.
- [ ] **Category filter** — Click a category (Shirts, Jackets, etc.) — list updates.
- [ ] **Search** — Click the search icon, type a keyword, press Enter.
- [ ] **Product detail** — Click any product card. Size selector and quantity stepper work.
- [ ] **Sign up** — Go to `/signup`. Create an account.
- [ ] **Login** — Go to `/login`. Sign in with the account you created.
- [ ] **Add to cart** — Add items from product cards or the detail page.
- [ ] **Cart** — Go to `/cart`. Adjust quantities, remove items.
- [ ] **Checkout** — Go to `/checkout`. Fill in shipping details and place the order.
- [ ] **Health check** — Visit `http://localhost:5000/api/health`. Should return `{"status":"ok"}`.

---

## 7. API Reference

**Base URL:** `http://localhost:5000/api`

### Authentication

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/auth/signup` | No | Register a new account |
| `POST` | `/auth/login` | No | Login and receive a JWT token |
| `GET` | `/auth/me` | Yes | Get the currently authenticated user |

**POST /auth/signup — Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**POST /auth/signup — Response (201)**
```json
{
  "token": "<jwt-token>",
  "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

**POST /auth/login — Request Body**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**POST /auth/login — Response (200)**
```json
{
  "token": "<jwt-token>",
  "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

> Pass the token in subsequent requests as: `Authorization: Bearer <jwt-token>`

---

### Products

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `GET` | `/products` | No | List products (supports filtering) |
| `GET` | `/products/:id` | No | Get a single product by ID |

**GET /products — Query Parameters**

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `category` | string | `?category=shirts` | Filter by category |
| `search` | string | `?search=linen` | Search by product name |
| `featured` | boolean | `?featured=true` | Show featured products only |

**Supported categories:** `shirts`, `jackets`, `pants`, `shoes`, `accessories`

**GET /products — Response (200)**
```json
[
  {
    "_id": "...",
    "name": "Liberty Linen Shirt",
    "price": 49.99,
    "description": "...",
    "image": "https://...",
    "category": "shirts",
    "sizes": ["S", "M", "L", "XL"],
    "stock": 45,
    "featured": true,
    "rating": 4.7
  }
]
```

---

### Orders

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/orders` | **Yes** | Create a new order |
| `GET` | `/orders/me` | **Yes** | Get all orders for current user |

**POST /orders — Request Body**
```json
{
  "items": [
    {
      "product": "<product-id>",
      "name": "Liberty Linen Shirt",
      "price": 49.99,
      "size": "M",
      "qty": 2
    }
  ],
  "total": 99.98,
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, Apt 4B",
    "city": "New York",
    "phone": "+1 (555) 000-0000"
  }
}
```

**POST /orders — Response (201)**
```json
{
  "_id": "...",
  "user": "<user-id>",
  "items": [...],
  "total": 99.98,
  "status": "pending",
  "shippingAddress": {...},
  "createdAt": "2026-06-04T...",
  "updatedAt": "2026-06-04T..."
}
```

---

### Health Check

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `GET` | `/health` | No | Server health check |

**Response (200)**
```json
{ "status": "ok", "timestamp": "2026-06-04T16:00:00.000Z" }
```

---

## 8. Development Workflow

### Making Frontend Changes

- Edit any file inside `frontend/src/`
- Vite's **Hot Module Replacement (HMR)** will update the browser instantly — no refresh needed
- Styles are in `frontend/src/index.css` (Neumorphic design system)
- API calls go through `frontend/src/lib/api.js` — add new endpoints there

### Making Backend Changes

- Edit any file inside `backend/src/`
- The server restarts automatically thanks to Node.js `--watch`
- Models live in `backend/src/models/` — edit schemas there
- Routes live in `backend/src/routes/` — add new endpoints there

### Adding a New Product Category

**Backend** — Update the enum in `backend/src/models/Product.js`:
```js
enum: ['shirts', 'jackets', 'pants', 'shoes', 'accessories', 'your-new-category']
```

**Frontend** — Add the category to the array in `frontend/src/components/CategoryBar.jsx`:
```js
const categories = [
  // ...existing categories
  { id: 'your-new-category', name: 'Your Category', icon: FaIcon }
]
```

### Resetting All Data

To wipe and re-seed the database:

```bash
cd backend
npm run seed
```

This deletes all existing products and re-inserts the 8 default products.

---

## 9. Production Build & Deployment

### 9.1 Build the Frontend

```bash
cd frontend
npm run build
```

The optimised static files will be output to `frontend/dist/`. This folder can be served by any static file host (Vercel, Netlify, Nginx, Apache).

Preview the production build locally:

```bash
cd frontend
npm run preview
```

### 9.2 Run the Backend in Production

```bash
cd backend
npm start
```

This runs `node src/index.js` without the `--watch` flag.

### 9.3 Pre-Deployment Checklist

Before deploying, complete every item on this list:

- [ ] **Generate a new `JWT_SECRET`**
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
  Paste the output into your production environment's `JWT_SECRET` variable.

- [ ] **Update CORS origin** in `backend/src/index.js` to your actual frontend domain:
  ```js
  // Change this:
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
  // To this:
  app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
  ```

- [ ] **Add `FRONTEND_URL`** to your backend environment variables on your hosting provider.

- [ ] **Update the API base URL** in `frontend/src/lib/api.js`:
  ```js
  // Change this:
  const API_BASE = 'http://localhost:5000/api'
  // To this:
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  ```
  Then add `VITE_API_URL=https://your-backend-domain.com/api` to your frontend hosting environment.

- [ ] **Set `NODE_ENV=production`** on the backend hosting provider.

- [ ] **Add `.gitignore` to `backend/`** to protect your secrets:
  ```
  node_modules/
  .env
  ```

- [ ] **Use MongoDB Atlas** (not a local MongoDB) for your production database.

### 9.4 Recommended Hosting Options

| Service | Best For | Free Tier |
|---------|----------|-----------|
| **Render** | Backend (Node.js) | Yes (spins down after inactivity) |
| **Railway** | Backend (Node.js) | Yes (limited hours) |
| **Vercel** | Frontend (React/Vite) | Yes (generous) |
| **Netlify** | Frontend (React/Vite) | Yes (generous) |
| **MongoDB Atlas** | Database | Yes (M0 512MB) |
| **Upstash** | Redis (serverless) | Yes (10K requests/day) |

---

## 10. Troubleshooting

### MongoDB Connection Failed

**Error:**
```
❌ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
- If using local MongoDB, start the service: `net start MongoDB` (Windows)
- If the service is not found, install MongoDB from https://mongodb.com/try/download/community
- If using Atlas, check that your `MONGODB_URI` in `.env` is correct and your IP is whitelisted

---

### Port Already in Use

**Error:**
```
Error: listen EADDRINUSE :::5000
```

**Solutions:**
- Find and kill the process using port 5000:
  ```powershell
  # Windows PowerShell
  netstat -ano | findstr :5000
  # Find the PID in the last column, then:
  taskkill /PID <PID> /F
  ```
- Or change the backend port in `backend/.env`:
  ```env
  PORT=5001
  ```
  Then update `frontend/src/lib/api.js` to match: `const API_BASE = 'http://localhost:5001/api'`

---

### Frontend Cannot Connect to Backend

**Symptoms:** Products do not load, login fails, a network error appears in the browser console.

**Solutions:**
1. Make sure the backend is running (`npm run dev` in the `backend/` folder)
2. Check that the backend started on port 5000 — look for `🚀 Server running on http://localhost:5000`
3. Confirm `frontend/src/lib/api.js` has `const API_BASE = 'http://localhost:5000/api'`
4. If you changed the backend port, update `API_BASE` to match

---

### Products Not Showing

**Symptoms:** Products page shows "No Releases Found" even after starting the backend.

**Solutions:**
Run the database seeder:
```bash
cd backend
npm run seed
```

Then refresh the page. You should see 8 products appear.

---

### Redis Warning in Console

**Message:**
```
⚠️ Could not connect to Redis. Running in DB-only mode.
```

**Action:** No action needed. This is informational. The app works fully without Redis — it just means product responses are not cached. Install Redis only if you want caching.

---

### `npm install` Fails

**Solutions:**
- Make sure you are running Node.js v18 or higher: `node --version`
- Delete `node_modules` and the lock file, then reinstall:
  ```bash
  # Windows PowerShell
  Remove-Item -Recurse -Force node_modules
  Remove-Item package-lock.json
  npm install
  ```

---

### JWT / Auth Errors After Server Restart

**Symptoms:** Users are unexpectedly logged out after restarting the backend.

**Cause:** If you change `JWT_SECRET` in `.env`, all previously issued tokens become invalid.

**Solution:** This is expected behaviour. Users will need to log in again after a `JWT_SECRET` change. Do not change the secret in production unless rotating for security reasons.

---

*Guide version 2.0 — Fashion & Freedom E-Commerce Project — June 2026*
