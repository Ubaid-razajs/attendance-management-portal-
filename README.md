# Attendly Attendance Management Portal

Full-stack school attendance management system.

- `frontend/` — React + Vite + Tailwind + Framer Motion
- `backend/` — Node.js + Express + MongoDB + JWT

## Run locally

Open **Terminal 1**:

```bash
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
```

Open **Terminal 2**:

```bash
cd frontend
npm install
npm run dev
```

Then open the Vite URL shown in the terminal, normally `http://localhost:5173`.

The frontend already proxies `/api` to `http://localhost:5000` in development. For a different backend host, set `VITE_API_URL` in `frontend/.env.local`.

## MongoDB

The default local connection is:

`mongodb://127.0.0.1:27017/attendance_portal`

For MongoDB Atlas, replace `MONGO_URI` in `backend/.env`.

## Demo accounts

After `npm run seed`:

- Admin: `admin@school.com` / `Admin@12345`
- Teacher: `teacher@school.com` / `Admin@12345`
- Parent: `parent@school.com` / `Admin@12345`

## Included backend modules

JWT auth, password reset, students, teachers, classes, attendance, bulk attendance, kiosk scanning, leave applications/approval, notifications, reports + CSV export, school settings, role-based authorization, validation/error handling, security middleware and database seed data.

## Important

Do not commit your real `backend/.env`, MongoDB credentials, JWT secret, SMTP credentials or production API keys. Use `.env.example` as the template.
