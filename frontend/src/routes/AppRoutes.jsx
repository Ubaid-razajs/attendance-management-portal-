import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import { ROLES } from '../constants/roles'
import Dashboard from '../pages/admin/Dashboard'
import Students from '../pages/admin/Students'
import AddStudent from '../pages/admin/AddStudent'
import StudentProfile from '../pages/admin/StudentProfile'
import StudentIDCard from '../pages/admin/StudentIDCard'
import Teachers from '../pages/admin/Teachers'
import Classes from '../pages/admin/Classes'
import Attendance from '../pages/admin/Attendance'
import LeaveRequests from '../pages/admin/LeaveRequests'
import Reports from '../pages/admin/Reports'
import Notifications from '../pages/admin/Notifications'
import Settings from '../pages/admin/Settings'
import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'

const adminRoutes = [
  ['/admin/dashboard', Dashboard],
  ['/admin/students', Students],
  ['/admin/students/add', AddStudent],
  ['/admin/students/:id', StudentProfile],
  ['/admin/students/:id/card', StudentIDCard],
  ['/admin/teachers', Teachers],
  ['/admin/classes', Classes],
  ['/admin/attendance', Attendance],
  ['/admin/leaves', LeaveRequests],
  ['/admin/reports', Reports],
  ['/admin/notifications', Notifications],
  ['/admin/settings', Settings],
]

function AdminPage({ Component }) {
  return <ProtectedRoute><RoleRoute allowedRoles={[ROLES.ADMIN]}><AdminLayout><Component /></AdminLayout></RoleRoute>
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      {adminRoutes.map(([path, Component]) => <Route key={path} path={path} element={<AdminPage Component={Component} />} />)}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  )
}
