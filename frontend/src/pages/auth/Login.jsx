import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LockKeyhole, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import useAuth from '../../hooks/useAuth'
import { getApiError } from '../../services/api'

const roleRedirects = { admin: '/admin/dashboard', teacher: '/teacher/dashboard', parent: '/parent/dashboard' }

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, user, loading } = useAuth()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('admin@school.com')
  const [password, setPassword] = useState('Admin@12345')
  const [role, setRole] = useState('admin')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && isAuthenticated) navigate(roleRedirects[user?.role] || '/admin/dashboard', { replace: true })
  }, [loading, isAuthenticated, user, navigate])

  useEffect(() => {
    const defaults = { admin: 'admin@school.com', teacher: 'teacher@school.com', parent: 'parent@school.com' }
    setEmail(defaults[role])
  }, [role])

  const submit = async (event) => {
    event.preventDefault(); setError(''); setSubmitting(true)
    try {
      const session = await login({ email, password, role })
      const target = location.state?.from || roleRedirects[session.role] || '/admin/dashboard'
      navigate(target, { replace: true })
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally { setSubmitting(false) }
  }

  return <div className="grid min-h-screen lg:grid-cols-2"><div className="hidden bg-indigo-600 p-10 text-white lg:flex lg:flex-col lg:justify-between"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-lg font-black text-indigo-600">A</div><span className="text-xl font-bold">Attendly</span></div><div className="max-w-lg"><p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-indigo-200">Attendance management</p><h1 className="text-5xl font-bold leading-tight">One simple place to manage every attendance moment.</h1><p className="mt-6 text-lg leading-8 text-indigo-100">Track students, monitor attendance, review leaves and keep your school connected.</p></div><div className="flex items-center gap-2 text-sm text-indigo-100"><ShieldCheck size={18}/> Secure JWT role-based access</div></div><div className="flex items-center justify-center bg-slate-50 p-6"><motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md"><div className="mb-8 lg:hidden"><div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-600 text-lg font-black text-white">A</div></div><h2 className="text-3xl font-bold">Welcome back</h2><p className="mt-2 text-sm text-slate-500">Sign in with one of the seeded demo accounts or your school account.</p>{error && <div className="mt-5 flex gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"><AlertCircle size={18} className="mt-0.5 shrink-0"/><span>{error}</span></div>}<form onSubmit={submit} className="mt-8 space-y-5"><label className="block"><span className="mb-2 block text-sm font-semibold">Portal role</span><select value={role} onChange={e => setRole(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"><option value="admin">Administrator</option><option value="teacher">Teacher</option><option value="parent">Parent</option></select></label><label className="block"><span className="mb-2 block text-sm font-semibold">Email address</span><div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-indigo-500"><Mail size={18} className="text-slate-400"/><input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@school.com" className="w-full bg-transparent px-3 py-3 text-sm outline-none"/></div></label><label className="block"><span className="mb-2 block text-sm font-semibold">Password</span><div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-indigo-500"><LockKeyhole size={18} className="text-slate-400"/><input required type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent px-3 py-3 text-sm outline-none"/><button type="button" onClick={() => setShow(v => !v)} className="text-slate-400">{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label><div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-semibold text-indigo-600">Forgot password?</Link></div><Button type="submit" disabled={submitting} className="w-full">{submitting ? 'Signing in…' : 'Sign in'} {!submitting && <ArrowRight size={17}/>}</Button></form><div className="mt-6 rounded-xl bg-slate-100 p-4 text-xs text-slate-500"><p className="font-semibold text-slate-700">Demo password</p><p className="mt-1">Admin@12345 for all three seeded accounts.</p></div></motion.div></div></div>
}
