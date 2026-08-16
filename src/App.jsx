import { Navigate, Route, Routes } from 'react-router-dom'

const pages = [
  ['dashboard', 'Dashboard'],
  ['employees', 'Employees'],
  ['employees/add', 'Add Employee'],
  ['employees/:id', 'Employee Details'],
  ['attendance', 'Attendance'],
  ['attendance/daily', 'Daily Attendance'],
  ['attendance/calendar', 'Attendance Calendar'],
  ['attendance/requests', 'Attendance Requests'],
  ['leaves', 'Leave Management'],
  ['leaves/requests', 'Leave Requests'],
  ['shifts', 'Shifts'],
  ['departments', 'Departments'],
  ['locations', 'Locations'],
  ['reports', 'Reports'],
  ['reports/attendance', 'Attendance Report'],
  ['reports/late', 'Late & Absence Report'],
  ['payroll', 'Payroll'],
  ['notifications', 'Notifications'],
  ['profile', 'Profile'],
  ['settings', 'Settings'],
  ['settings/roles', 'Roles & Permissions'],
  ['settings/company', 'Company Settings'],
]

function Placeholder({ title }) {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-sm font-medium text-indigo-600">Attendance Management Portal</p>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-500">Frontend page ready for implementation.</p>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      {pages.map(([path, title]) => (
        <Route key={path} path={`/${path}`} element={<Placeholder title={title} />} />
      ))}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
