import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Students from '../pages/admin/Students'
import Login from '../pages/auth/Login'

const Placeholder = ({ title }) => <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-2 text-sm text-slate-500">This module is ready for the next UI implementation.</p></div>

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
    <Route path="/admin/students" element={<AdminLayout><Students /></AdminLayout>} />
    <Route path="/admin/students/add" element={<AdminLayout><Placeholder title="Add Student" /></AdminLayout>} />
    <Route path="/admin/students/:id" element={<AdminLayout><Placeholder title="Student Profile" /></AdminLayout>} />
    <Route path="/admin/teachers" element={<AdminLayout><Placeholder title="Teachers" /></AdminLayout>} />
    <Route path="/admin/classes" element={<AdminLayout><Placeholder title="Classes" /></AdminLayout>} />
    <Route path="/admin/attendance" element={<AdminLayout><Placeholder title="Attendance" /></AdminLayout>} />
    <Route path="/admin/leaves" element={<AdminLayout><Placeholder title="Leave Requests" /></AdminLayout>} />
    <Route path="/admin/reports" element={<AdminLayout><Placeholder title="Reports" /></AdminLayout>} />
    <Route path="/admin/notifications" element={<AdminLayout><Placeholder title="Notifications" /></AdminLayout>} />
    <Route path="/admin/settings" element={<AdminLayout><Placeholder title="Settings" /></AdminLayout>} />
    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
  </Routes>
}
