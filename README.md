# 🚀 Notification Engine

A production-grade, full-stack notification infrastructure platform built with the MERN stack. Supports real-time email delivery, Bull job queues, Redis-backed processing, JWT authentication, Google OAuth, and a live analytics dashboard.

> Built to demonstrate scalable backend architecture, async job processing, and modern React UI design.

---

## 🌐 Live Features

- 📧 **Multi-channel notifications** — Email, SMS, Push
- 🔐 **Auth system** — JWT login/register + Google OAuth 2.0
- ⚙️ **Bull Queue + Redis** — Async job processing with retry logic and priority levels
- 📊 **Live Dashboard** — Real-time stats pulled from MongoDB
- 🔍 **Logs & Analytics** — Filter by channel, status, and type
- 📬 **Queue Monitor** — Live job stream with polling every 5 seconds
- ⚡ **Rate Limiting** — 100 requests per 15 minutes per IP
- 🌙 **Quiet Hours** — Per-user notification preferences

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Tailwind CSS, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Queue | Bull, Redis |
| Auth | JWT, bcryptjs, Google OAuth 2.0 |
| Email | Nodemailer + Gmail SMTP |

---

## ⚙️ Setup

### 1. Clone the repo
\\\ash
git clone https://github.com/Yashi1204/Notification-Engine.git
cd Notification-Engine
\\\

### 2. Backend
\\\ash
cd backend && npm install
cp .env.example .env
node server.js
\\\

### 3. Frontend
\\\ash
cd frontend && npm install && npm run dev
\\\

### 4. Redis
\\\ash
redis-server
\\\

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | \/api/auth/register\ | Register new user | ❌ |
| POST | \/api/auth/login\ | Login with JWT | ❌ |
| POST | \/api/auth/google\ | Google OAuth login | ❌ |
| POST | \/api/notifications/send\ | Send notification | ✅ |
| GET | \/api/notifications\ | Get all notifications | ❌ |

---

## 🔑 Key Technical Highlights

### Async Job Queue (Bull + Redis)
Notifications are not sent synchronously. Every request adds a job to a Bull queue backed by Redis with 3 retry attempts, 5 second backoff delay, and priority levels.

### JWT + Google OAuth
Passwords hashed with bcryptjs. JWT tokens expire in 7 days. Google OAuth verifies ID tokens server-side using google-auth-library.

### Real-time Dashboard
Dashboard stats and charts fetch live from MongoDB. Queue monitor polls every 5 seconds for live job status.

---

## 🧠 What I Learned

- Designing a decoupled architecture where API and queue processing are separate concerns
- Implementing async job queues with Bull and Redis for reliable delivery
- Building real-time UI that syncs with live backend data
- Handling OAuth flows securely on both client and server
- Managing environment secrets and Git hygiene in production-style projects

---

## 👩‍💻 Author

**Yashi**
[GitHub](https://github.com/Yashi1204) • [LinkedIn](https://www.linkedin.com/in/yashi1204)

---

## 📄 License

MIT
