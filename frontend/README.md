# Attendance Management Portal — Frontend

A responsive React/Vite frontend for a school attendance management system with separate Admin, Teacher, Parent and Kiosk experiences.

## Stack

- React + Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- React Router DOM
- Framer Motion
- Lucide React
- Recharts
- Axios
- date-fns

## Portal screens

### Admin
Dashboard, Students, Add Student, Student Profile, Student ID Card, Teachers, Classes, Attendance, Leave Requests, Reports, Notifications and Settings.

### Teacher
Dashboard, My Class, Attendance Monitoring, Attendance History and Leave Requests.

### Parent
Dashboard, Attendance, Apply Leave and Leave History.

### Kiosk
Scanner / attendance check-in screen.

## Frontend behavior

The UI is currently backend-independent. `AuthContext` provides a local demo session so all role-based screens can be tested before API integration. Forms, filters, attendance status controls, leave actions, notifications and dashboard interactions use local state and can later be wired to the service layer.

## Run locally

From the `frontend` directory:

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal (normally `http://localhost:5173`).

### If an old Vite dependency error appears

After pulling the latest GitHub code, clear the old dependency cache and reinstall. On Windows Command Prompt:

```bat
rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm install
npm run dev
```

This is especially important after changing icon exports or major dependency versions because Vite caches optimized modules in `node_modules/.vite`.

## Quality checks

```bash
npm run lint
npm run build
```

## Architecture

```text
src/
├── components/     # reusable UI, common modules and role layouts
├── pages/          # route-level screens
├── routes/         # routing and access guards
├── context/        # global session/school state
├── hooks/          # reusable React hooks
├── services/       # backend/API integration layer
├── utils/          # formatting and permissions helpers
└── constants/      # roles and attendance enums
```

## API integration

When the backend is ready, replace the demo `AuthContext` login with `authService` and connect the existing student, teacher, attendance, leave and notification services. Keep secrets out of source control and use Vite `import.meta.env` variables for public configuration.
