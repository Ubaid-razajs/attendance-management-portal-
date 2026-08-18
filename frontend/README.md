# Attendance Management Portal — Frontend

React/Vite frontend for a role-based school attendance management system.

## Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Lucide React
- Recharts
- Axios
- date-fns

## Architecture

```text
src/
├── components/     # Reusable UI and role layouts
├── pages/          # Route-level screens
├── routes/         # Authentication and role guards
├── context/        # Global application state
├── hooks/          # Reusable React hooks
├── services/       # API integration layer
├── utils/          # Formatting and helpers
└── constants/      # Shared enums and configuration
```

## Admin modules currently implemented

- Dashboard
- Students
- Add Student
- Student Profile
- Student ID Card
- Teachers
- Classes
- Attendance
- Leave Requests
- Reports
- Notifications
- Settings
- Login / Forgot Password

## Authentication

The frontend currently uses a lightweight local session through `AuthContext` so the UI can be developed independently of the backend. Replace the `login` implementation with the real API authentication service when the backend is connected.

Protected routes require an authenticated session, and `RoleRoute` enforces the user's role.

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Environment

Backend/API configuration belongs in `.env` and should be accessed through Vite's `import.meta.env` variables. Never commit secrets.
