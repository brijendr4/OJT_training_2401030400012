# Fashion & Freedom — E-Commerce Setup Guide

> Complete guide to deploy and run this project on a new device via ZIP transfer.

---

## 📦 Prerequisites

Before running this project, make sure you have the following ready or installed:

| Tool        | Version / Option | Setup / Download Link                                     |
|-------------|------------------|-----------------------------------------------------------|
| **Node.js** | v18+             | [https://nodejs.org](https://nodejs.org)                  |
| **MongoDB** | Local or Cloud   | **Local:** [Download Community Server](https://www.mongodb.com/try/download/community) <br> **Cloud:** [MongoDB Atlas (Free)](https://mongodb.com/atlas) (No installation required) |
| **Redis**   | Optional         | [https://redis.io/download](https://redis.io/download)    |
| **Git**     | Latest           | [https://git-scm.com](https://git-scm.com)                |

> [!TIP]
> **No Local MongoDB Needed:** You do not have to install MongoDB locally on your device! You can use a free MongoDB Atlas cloud cluster. See the step-by-step **[Cloud Setup instructions](#cloud-how-to-set-up-mongodb-atlas-free-cloud-database)** under Step 4.

> [!NOTE]
> **Redis is optional.** The app has a built-in fallback — if Redis is not installed or not running, the app will function perfectly in "DB-only mode" (no caching, but fully operational).

---

## 🚀 Step-by-Step Setup

### Step 1: Prepare the ZIP File

On your **current machine**, create a ZIP of the project — but **exclude** `node_modules` folders to keep the file small:

```bash
# From the parent directory of E-commerce
# Windows (PowerShell)
Compress-Archive -Path "E-commerce\backend\src", "E-commerce\backend\package.json", "E-commerce\backend\package-lock.json", "E-commerce\backend\.env", "E-commerce\frontend\src", "E-commerce\frontend\public", "E-commerce\frontend\package.json", "E-commerce\frontend\package-lock.json", "E-commerce\frontend\index.html", "E-commerce\frontend\vite.config.js", "E-commerce\frontend\tailwind.config.js", "E-commerce\frontend\eslint.config.js", "E-commerce\guide.md" -DestinationPath "E-commerce.zip"
```

**Or simply** right-click the `E-commerce` folder → "Send to" → "Compressed (zipped) folder", then **delete** the `node_modules` folders from inside the ZIP (they'll be reinstalled).

### Step 2: Extract on the New Device

Unzip the archive to any directory:

```bash
# Example
mkdir C:\projects
# Then extract E-commerce.zip into C:\projects\E-commerce
```

### Step 3: Install Backend Dependencies

```bash
cd E-commerce/backend
npm install
```

### Step 4: Configure Environment Variables

Edit `backend/.env` with your MongoDB connection string:

```env
# For local MongoDB (default)
MONGODB_URI=mongodb://localhost:27017/ecommerce

# For MongoDB Atlas (cloud — recommended for portability)
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecommerce

JWT_SECRET=fashionfreedom_secret_key_2024_xk9m2
PORT=5000
```

> [!IMPORTANT]
> If using **MongoDB Atlas** (cloud), replace the `MONGODB_URI` with your Atlas connection string. Create a free cluster at [https://mongodb.com/atlas](https://mongodb.com/atlas).

#### ☁️ How to Set Up MongoDB Atlas (Free Cloud Database)
If you don't have MongoDB installed locally, you can set up a free cloud database in 2 minutes:
1. Go to [MongoDB Atlas](https://mongodb.com/atlas) and sign up for a free account.
2. Create a new project and build a **M0 Free Cluster**.
3. In the **Security > Network Access** tab, click **Add IP Address** and select **Allow Access From Anywhere** (`0.0.0.0/0`) so you can connect from any network/device.
4. In the **Security > Database Access** tab, create a database user with a username and password (keep these handy).
5. Go to **Deployment > Database**, click **Connect** on your cluster, and choose **Drivers** (Node.js).
6. Copy the connection string. It will look like this:
   `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
7. Replace `<username>` and `<password>` with the database user credentials you created in Step 4.
8. Paste this connection string into `backend/.env` as the `MONGODB_URI` value (make sure to specify a database name like `/ecommerce` before the `?` if it isn't there, e.g., `@cluster0.xxxx.mongodb.net/ecommerce?retryWrites=...`).
9. Run `npm run seed` to populate your cloud database with the initial products!

### Step 5: Start MongoDB (if running locally)

```bash
# Windows — Start MongoDB service
net start MongoDB

# Or run mongod manually
mongod --dbpath "C:\data\db"
```

### Step 6: Seed the Database

This populates the database with demo product data:

```bash
cd E-commerce/backend
npm run seed
```

You should see output like:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
🌱 Seeded 8 products
✅ Done. Disconnected.
```

### Step 7: Start the Backend Server

```bash
cd E-commerce/backend
npm run dev
```

The backend will start on `http://localhost:5000`. You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

> [!TIP]
> If you see a Redis warning like `⚠️ Could not connect to Redis`, that's fine — the app will run without caching.

### Step 8: Install Frontend Dependencies

Open a **new terminal** window:

```bash
cd E-commerce/frontend
npm install
```

### Step 9: Start the Frontend Dev Server

```bash
cd E-commerce/frontend
npm run dev
```

The frontend will start on `http://localhost:5173`. Open this URL in your browser.

---

## ✅ Verify Everything Works

1. **Homepage** — Visit `http://localhost:5173` → You should see the neumorphic homepage with trending slider, product cards, and testimonials
2. **Products** — Click "Collections" or category buttons → Products should load from the API
3. **Sign Up** — Create an account via the Sign Up page
4. **Login** — Log in with your created account
5. **Add to Cart** — Add products to cart, change quantities
6. **Checkout** — Complete a checkout with shipping details
7. **API Health** — Visit `http://localhost:5000/api/health` → Should return `{"status":"ok"}`

---

## 🗂️ Project Structure

```
E-commerce/
├── backend/
│   ├── .env                    # Environment variables (MongoDB, JWT)
│   ├── package.json            # Backend dependencies
│   └── src/
│       ├── index.js            # Express server entry point
│       ├── seed.js             # Database seeder script
│       ├── lib/
│       │   └── redis.js        # Redis cache (with fallback)
│       ├── middleware/
│       │   └── auth.js         # JWT authentication middleware
│       ├── models/
│       │   ├── User.js         # User schema (bcrypt password hashing)
│       │   ├── Product.js      # Product schema
│       │   └── Order.js        # Order schema
│       └── routes/
│           ├── auth.js         # Login, Signup, Me endpoints
│           ├── products.js     # Product listing & detail (with Redis cache)
│           └── orders.js       # Order creation & retrieval
│
├── frontend/
│   ├── index.html              # HTML entry point
│   ├── vite.config.js          # Vite + TailwindCSS config
│   ├── package.json            # Frontend dependencies
│   └── src/
│       ├── App.jsx             # React Router setup
│       ├── index.css           # Themesberg Neumorphic design system
│       ├── main.jsx            # React DOM entry
│       ├── lib/
│       │   └── api.js          # API client (fetch wrapper)
│       ├── context/
│       │   ├── AuthContext.jsx  # Authentication state management
│       │   └── CartContext.jsx  # Shopping cart state (useReducer)
│       └── components/
│           ├── Navbar.jsx      # Top navigation bar
│           ├── Footer.jsx      # Site footer with socials & newsletter
│           ├── Home.jsx        # Homepage with hero, deals, testimonials
│           ├── TrendsSlider.jsx # Auto-rotating trends carousel
│           ├── CategoryBar.jsx  # Horizontal category filter
│           ├── ProductCard.jsx  # Product grid card
│           ├── ProductsPage.jsx # All products listing page
│           ├── ProductDetail.jsx # Single product detail page
│           ├── CartPage.jsx    # Shopping cart page
│           ├── Checkout.jsx    # Checkout form + order summary
│           ├── Login.jsx       # Sign in page
│           └── Signup.jsx      # Create account page
│
└── guide.md                    # This file
```

---

## 🔧 API Endpoints

| Method | Endpoint             | Auth | Description                 |
|--------|---------------------|------|-----------------------------|
| GET    | `/api/health`        | No   | Server health check         |
| POST   | `/api/auth/signup`   | No   | Create new account          |
| POST   | `/api/auth/login`    | No   | Login, returns JWT token    |
| GET    | `/api/auth/me`       | Yes  | Get current user info       |
| GET    | `/api/products`      | No   | List products (with filters)|
| GET    | `/api/products/:id`  | No   | Get single product          |
| POST   | `/api/orders`        | Yes  | Create new order            |
| GET    | `/api/orders/me`     | Yes  | Get current user's orders   |

**Query Parameters for Products:**
- `?category=shirts` — Filter by category
- `?search=linen` — Search by name
- `?featured=true` — Show featured only

---

## 🛠️ Troubleshooting

### MongoDB Connection Failed
```
❌ MongoDB connection error: connect ECONNREFUSED
```
**Fix:** Make sure MongoDB is installed and running. Check if the `MONGODB_URI` in `.env` is correct.

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Fix:** Change the `PORT` in `backend/.env` to another port (e.g., `5001`), or kill the process using port 5000.

### Frontend Can't Connect to Backend
**Fix:** Make sure the backend is running on port 5000. The frontend API client (`frontend/src/lib/api.js`) connects to `http://localhost:5000/api`. If you changed the backend port, update the `API_BASE` variable in that file.

### Products Not Showing
**Fix:** Run the seeder:
```bash
cd backend
npm run seed
```

---

## 🏗️ Production Build

To create an optimized production build of the frontend:

```bash
cd frontend
npm run build
```

The output will be in `frontend/dist/`. You can serve this with any static file server (Nginx, Apache, Vercel, etc.).

For the backend in production:
```bash
cd backend
npm start
```

> [!WARNING]
> In production, update `CORS` origin in `backend/src/index.js` from `http://localhost:5173` to your actual frontend domain, and change the `JWT_SECRET` to a strong random string.
