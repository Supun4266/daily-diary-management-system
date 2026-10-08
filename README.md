# Daily Diary Management System

A full-stack **MERN** journaling app. Users sign up, log in and keep a private diary: each entry has a title, a description, a date and a mood. Every entry is tied to its owner, so users only see their own diary.

## Features

- User registration and login with bcrypt-hashed passwords and JWT authentication
- Create, view, edit and delete diary entries
- Mood tracking on every entry
- Personal dashboard listing your entries as cards
- Protected API: every diary request is verified with the user's token

## Tech stack

| Area | Technology |
|---|---|
| Front end | React (Vite), React Router, Axios, React Icons |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Create an account |
| POST | `/api/users/login` | Log in and receive a JWT |
| GET | `/api/diary` | List the logged-in user's entries |
| POST | `/api/diary` | Create an entry |
| PUT | `/api/diary/:id` | Update an entry |
| DELETE | `/api/diary/:id` | Delete an entry |

## Run locally

**Backend**
```bash
cd diary-backend
npm install
cp .env.example .env   # set MONGO_URI and JWT_SECRET
npm run dev            # http://localhost:5000
```

**Front end**
```bash
cd diary-frontend
npm install
npm run dev            # http://localhost:5173
```
