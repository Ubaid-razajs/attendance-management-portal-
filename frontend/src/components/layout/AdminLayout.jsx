import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Users, UserRound, GraduationCap, ClipboardCheck, CalendarDays, FileBarChart3, Bell, Settings, Menu, X, LogOut, Search } from 'lucide-react'
import useAuth from '../../hooks/useAuth'

const items = [
  ['Dashboard', '/admin/dashboard', LayoutDashboard], ['Students', '/admin/students', Users], ['Teachers', '/admin/teachers', UserRound],
  ['Classes', '/admin/classes', GraduationCap], ['Attendance', '/admin/attendance', ClipboardCheck], ['Leave Requests', '/admin/leaves', CalendarDays],
  ['Reports', '/admin/reports', FileBarChart3], ['Notifications', '/admin/notifications', Bell], ['Settings', '/admin/settings', Settings],
]

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const current = items.find(([, path]) => location.pathname.startsWith(path))?.[0] || 'Dashboard'

  const signOut = () => { logout(); navigate('/login', { replace: true }) }

  return <div className="min-h-screen bg-slate-50 text-slate-900">
    {open && <button aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-lg font-black text-white">A</div><div><p className="font-bold">Attendly</p><p className="text-xs text-slate-400">Management Portal</p></div></div><button aria-label="Close sidebar" onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"><X size={18}/></button></div>
      <nav className="space-y-1 p-4">{items.map(([label, path, Icon]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={19}/>{label}</NavLink>)}</nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 p-4"><button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600"><LogOut size={18}/> Sign out</button></div>
    </aside>
    <div className="lg:pl-72"><header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-8"><div className="flex items-center gap-3"><button aria-label="Open sidebar" onClick={() => setOpen(true)} className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"><Menu size={22}/></button><div><p className="text-xs font-medium text-slate-400">Admin Portal</p><h1 className="text-lg font-bold">{current}</h1></div></div><div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex"><Search size={17} className="text-slate-400"/><input aria-label="Search portal" placeholder="Search..." className="w-36 bg-transparent text-sm outline-none"/></div><button aria-label="Open notifications" onClick={() => navigate('/admin/notifications')} className="relative rounded-xl p-2.5 hover:bg-slate-100"><Bell size={19}/><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600"/></button><div title={user?.email} className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">{user?.name?.split(' ').map(part => part[0]).join('').slice(0,2) || 'AU'}</div></div></header><motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }} className="p-4 md:p-8">{children}</motion.main></div>
  </div>
}
