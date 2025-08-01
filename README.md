# 💸 Expense Tracker App

A full-stack **MERN** (MongoDB, Express, React, Node.js) application to track personal expenses with JWT-based authentication, Redux state management, and category/status filtering.

---

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
- **Backend (Render)**: [https://your-backend.onrender.com](https://your-backend.onrender.com)

---

## 📦 Features

- 🔐 User Authentication (JWT + cookie-based session)
- 🧾 Add, Edit, and Delete Expenses
- 🔍 Filter expenses by **category** or **done/undone**
- ☁️ Persistent storage with MongoDB Atlas
- ⚙️ Redux Toolkit for state management
- 🧠 Middleware-protected routes
- 🌙 Fully responsive with Tailwind CSS
- 🔔 Toast notifications with **Sonner**
- ✅ Confirmation dialog before deleting
- 🌐 Deployment on Vercel (frontend) and Render (backend)

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- Sonner (for notifications)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser & CORS

---

## 📁 Project Structure

expense-tracker/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── index.js
├── frontend/
│ ├── components/
│ ├── redux/
│ ├── App.jsx
│ └── main.jsx
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file:

ini
Copy
Edit
PORT=8000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
Start the backend server:

bash
Copy
Edit
npm start
3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
Create a .env file:

ini
Copy
Edit
VITE_API_URL=https://your-backend.onrender.com
Start the frontend:

bash
Copy
Edit
npm run dev
