# Attendance Management Portal — Frontend

Responsive React/Vite frontend for the school attendance management system with Admin, Teacher, Parent and Kiosk experiences.

## Stack

React + Vite, Tailwind CSS v4, React Router DOM, Framer Motion, Lucide React, Recharts, Axios and date-fns.

## Screens

Admin: Dashboard, Students, Add Student, Student Profile, Student ID Card, Teachers, Classes, Attendance, Leave Requests, Reports, Notifications and Settings.

Teacher: Dashboard, My Class, Attendance Monitoring, Attendance History and Leave Requests.

Parent: Dashboard, Attendance, Apply Leave and Leave History.

Kiosk: Scanner / attendance check-in screen.

## Run locally

```bash
npm install
npm run dev
```

The frontend uses `/api` in development and Vite proxies it to `http://localhost:5000`. Start the backend first; see `../backend/README.md`.

For a different backend URL, create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

## JWT session

Login now calls `POST /api/auth/login`, stores the returned JWT locally, and Axios automatically sends `Authorization: Bearer <token>` on protected requests. The session is validated through `GET /api/auth/me` on reload.

## Quality checks

```bash
npm run lint
npm run build
```

If an old Vite dependency cache causes an icon/module error on Windows:

```bat
rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm install
npm run dev
```

## API-connected features

Students CRUD, student profiles/ID cards, teachers CRUD, classes CRUD, attendance marking/bulk attendance/history, leave applications and approvals, notifications, reports/CSV export, settings, password reset and kiosk scanning are wired through the service layer. The backend source lives in `../backend`.
