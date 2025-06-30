
# 🔐 Full Stack User Auth App (React + Flask + MongoDB)

A modern **signup/login system** with a secure Flask backend and a sleek React frontend. It supports real-time form validation, password encryption, and responsive UI using TailwindCSS.

---

## 🌐 Live Stack Overview

| Layer       | Tech Stack            |
|-------------|------------------------|
| Frontend    | React + Vite + TailwindCSS |
| Backend     | Flask + Flask-CORS     |
| Database    | MongoDB                |
| Auth        | bcrypt (for password hashing) |

---

## 🚀 Features

- 📝 User **Signup** with name, email, phone, password
- 🔐 **Login** with email + password
- 🔄 Passwords are hashed using **bcrypt**
- 💾 User data stored in **MongoDB**
- 🌍 CORS support to allow React ↔ Flask communication
- 📦 Clean project structure for both frontend & backend

---

## 📁 Project Structure

```

fullstack-auth/
├── backend/                     # Flask API
│   ├── app.py                   # Flask server (signup, signin logic)
│   └── requirements.txt         # Python dependencies
│
├── frontend/                    # React client
│   ├── public/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Signup / Login pages
│   │   └── App.jsx              # Main App file
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js

````

---

## 🧑‍💻 Backend Setup (Flask)

### 🧱 Requirements

- Python 3.10+
- MongoDB (local or cloud)

### ⚙️ Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
````

### 📦 Example `requirements.txt`

```
Flask
flask-cors
pymongo
bcrypt
```

---

## 🎨 Frontend Setup (React + Vite)

### 🧱 Requirements

* Node.js (18+)

### ⚙️ Setup

```bash
cd frontend
npm install
npm run dev
```

### 🔗 Connect Frontend to Flask

In your frontend code (e.g. `signin.jsx` or `signup.jsx`):

```js
axios.post("http://localhost:5000/signup", {...})
```

Ensure both React (port 5173) and Flask (port 5000) run together.

---

## 🔐 API Endpoints

### `/signup` - Register new user

```http
POST /signup
Content-Type: application/json

{
  "name": "Priya",
  "email": "priya@example.com",
  "phone": "9876543210",
  "password": "securePass"
}
```

### `/signin` - Login user

```http
POST /signin
Content-Type: application/json

{
  "email": "priya@example.com",
  "password": "securePass"
}
```

---

## ✅ To-Do

* [x] Add JWT Token support for secure sessions
* [ ] Connect to MongoDB Atlas for production
* [ ] Add user dashboard after login
* [ ] Use Toasts for form feedback
* [ ] Deploy on Render (Flask) + Vercel (React)

---

## 👩‍💻 Author

**Priya Rathor**
🔗 [GitHub](https://github.com/Priya-Rathor)

---

## 🧰 Tech Used

* Flask, bcrypt, MongoDB
* React, TailwindCSS, Vite
* Axios, Postman (for testing)

---
