# Attendly Attendance Portal — Backend

Node.js + Express + MongoDB backend for the attendance management portal.

## Stack
- Node.js / Express
- MongoDB / Mongoose
- JWT authentication + bcrypt password hashing
- Helmet, CORS, rate limiting, Morgan
- Role-based authorization: `admin`, `teacher`, `parent`

## Local setup

From the repository root:

```bash
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
```

Make sure MongoDB is running locally, or put your MongoDB Atlas connection string in `.env` as `MONGO_URI`.

API: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

## Demo accounts

After `npm run seed`:

| Role | Email | Password |
|---|---|---|
| Admin | admin@school.com | Admin@12345 |
| Teacher | teacher@school.com | Admin@12345 |
| Parent | parent@school.com | Admin@12345 |

If you change `SEED_PASSWORD` before the first seed, use that password instead.

## API map

### Auth
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Students
- `GET /api/students`
- `GET /api/students/:id`
- `GET /api/students/:id/id-card`
- `POST /api/students` (admin)
- `PATCH /api/students/:id` (admin)
- `DELETE /api/students/:id` (admin; soft deactivate)

### Teachers
- `GET /api/teachers`
- `GET /api/teachers/:id`
- `POST /api/teachers` (admin)
- `PATCH /api/teachers/:id` (admin)
- `DELETE /api/teachers/:id` (admin; soft deactivate)

### Classes
- `GET /api/classes`
- `GET /api/classes/:id`
- `POST /api/classes` (admin)
- `PATCH /api/classes/:id` (admin)
- `DELETE /api/classes/:id` (admin)

### Attendance
- `GET /api/attendance?date=YYYY-MM-DD&classId=...`
- `GET /api/attendance/summary?date=YYYY-MM-DD&classId=...`
- `GET /api/attendance/student/:studentId`
- `POST /api/attendance/mark`
- `POST /api/attendance/bulk`

`/mark` body: `{ studentId, status, date, note, source }`.

### Leaves
- `GET /api/leaves?status=pending`
- `GET /api/leaves/:id`
- `POST /api/leaves` (parent)
- `PATCH /api/leaves/:id/status` (teacher/admin)

### Notifications
- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`
- `PATCH /api/notifications/read-all`
- `POST /api/notifications/broadcast` (admin)

### Reports / settings / kiosk
- `GET /api/reports/overview` (admin)
- `GET /api/reports/attendance`
- `GET /api/reports/attendance/export` (admin, CSV)
- `GET /api/settings`
- `PATCH /api/settings` (admin)
- `POST /api/kiosk/scan` (admin/teacher)

## Frontend connection

The React app reads `VITE_API_URL`. For local development, create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend sends the JWT as `Authorization: Bearer <token>`.
