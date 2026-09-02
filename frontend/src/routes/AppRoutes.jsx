import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import TeacherLayout from '../components/layout/TeacherLayout'
import ParentShell from '../components/common/ParentShell'
import KioskShell from '../components/common/KioskShell'
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
import PortalModule from '../components/common/PortalModule'
import Scanner from '../pages/kiosk/Scanner'

// Keep all protected routes behind the same authentication + role guards.
const adminPages = [
  ['/admin/dashboard', Dashboard], ['/admin/students', Students], ['/admin/students/add', AddStudent],
  ['/admin/students/:id', StudentProfile], ['/admin/students/:id/card', StudentIDCard], ['/admin/teachers', Teachers],
  ['/admin/classes', Classes], ['/admin/attendance', Attendance], ['/admin/leaves', LeaveRequests],
  ['/admin/reports', Reports], ['/admin/notifications', Notifications], ['/admin/settings', Settings],
]
const teacherPages = [['/teacher/dashboard', 'teacherDashboard'], ['/teacher/class', 'class'], ['/teacher/attendance', 'monitoring'], ['/teacher/history', 'history'], ['/teacher/leaves', 'teacherLeaves']]
const parentPages = [['/parent/dashboard', 'parentDashboard'], ['/parent/attendance', 'parentAttendance'], ['/parent/apply-leave', 'applyLeave'], ['/parent/leave-history', 'leaveHistory']]

function Guard({ role, children }) {
  return <ProtectedRoute><RoleRoute allowedRoles={[role]}>{children}</RoleRoute></ProtectedRoute>
}

export default function AppRoutes() {
  return <Routes>
    {/* The public entry point is always visible, even on a fresh browser session. */}
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    {adminPages.map(([path, Component]) => <Route key={path} path={path} element={<Guard role={ROLES.ADMIN}><AdminLayout><Component /></AdminLayout></Guard>} />)}
    {teacherPages.map(([path, type]) => <Route key={path} path={path} element={<Guard role={ROLES.TEACHER}><TeacherLayout><PortalModule type={type} /></TeacherLayout></Guard>} />)}
    {parentPages.map(([path, type]) => <Route key={path} path={path} element={<Guard role={ROLES.PARENT}><ParentShell><PortalModule type={type} /></ParentShell></Guard>} />)}
    <Route path="/kiosk/scanner" element={<KioskShell><Scanner /></KioskShell>} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
}
