# Premium Express.js & MongoDB Registration Application

This is a premium, fully-functional registration application built with **Express.js** for the backend server and **MongoDB** (via Mongoose ODM) for database storage. 

The application serves a stunning frontend layout utilizing pure HTML5, vanilla CSS3 (dark-themed glassmorphic components, keyframe floating animations, custom checkbox overlays), and responsive client-side JavaScript.

---

## Features

- **Clean Express Server**: Handles JSON body parsing, mounts API routes, and serves the static frontend application.
- **MongoDB Storage**: Uses Mongoose to define a strict User Schema, indexing email addresses to enforce uniqueness.
- **Bcrypt Hashing**: Securely hashes passwords using `bcryptjs` with 10 salt rounds before storing them in the database.
- **Interactive UI & Animations**:
  - **Mesh Floating Glow & Grid Background**: Aesthetic glowing orb animations and radial grids.
  - **Floating Labels**: Inputs with labels that move, shrink, and colorize upon focus/input.
  - **Dynamic Password Strength Meter**: Live scoring (Weak, Medium, Strong) based on character complexity.
  - **Live Guidelines Checklist**: Ticks off requirements dynamically as they are met.
  - **Password Toggle**: Show or hide passwords using a custom eye icon button.
  - **Glassmorphic Toasts**: Clean overlay error and success notifications.
  - **Shake Feedback**: Dynamic input validation shaking behavior.

---

## Project Structure

```
Day-18/
├── public/
│   ├── css/
│   │   └── style.css        # Premium custom stylesheet with animations
│   ├── js/
│   │   └── main.js          # Interactive JavaScript, password evaluation, and AJAX fetch
│   └── index.html           # Main semantic HTML structure
├── src/
│   ├── config/
│   │   └── db.js            # MongoDB connection logic using Mongoose
│   ├── models/
│   │   └── User.js          # User schema & validations
│   ├── controllers/
│   │   └── authController.js# Registration controller logic
│   ├── routes/
│   │   └── authRoutes.js    # Authentication API routes
│   └── server.js            # Application entry point
├── .env.example             # Environment configuration template
├── .env                     # Local environment file (ignored by Git)
├── package.json             # App dependencies & scripts
└── README.md                # This instructions file
```

---

## Installation & Setup

1. **Ensure MongoDB is running**:
   - Ensure MongoDB is listening on local port `27017` (e.g., local MongoDB Community Service).
   - Alternatively, you can specify your own MongoDB Atlas connection URI inside the `.env` file.

2. **Install Dependencies**:
   Navigate to the `Day-18` directory and run:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   The `.env` file should have:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/registration_db
   ```
   *(A `.env` has already been generated automatically for you).*

4. **Run the Application**:
   - **Development mode** (with hot-reloading via `nodemon`):
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```

5. **Test the Application**:
   Open [http://localhost:5000](http://localhost:5000) in your web browser.
