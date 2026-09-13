import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function RoleRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-500">Loading portal…</div>
  }

  if (!user) return <Navigate to="/login" replace />
  if (!allowedRoles?.includes(user.role)) return <Navigate to="/login" replace />

  return children
}
