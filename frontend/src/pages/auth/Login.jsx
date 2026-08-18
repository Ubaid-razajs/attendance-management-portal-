import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LockKeyhole, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import useAuth from '../../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const submit = (event) => {
    event.preventDefault()
    login({ email, password })
    navigate(location.state?.from || '/admin/dashboard', { replace: true })
  }

  return <div className="grid min-h-screen lg:grid-cols-2">
    <div className="hidden bg-indigo-600 p-10 text-white lg:flex lg:flex-col lg:justify-between"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-lg font-black text-indigo-600">A</div><span className="text-xl font-bold">Attendly</span></div><div className="max-w-lg"><p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-indigo-200">Attendance management</p><h1 className="text-5xl font-bold leading-tight">One simple place to manage every attendance moment.</h1><p className="mt-6 text-lg leading-8 text-indigo-100">Track students, monitor attendance, review leaves and keep your school connected.</p></div><div className="flex items-center gap-2 text-sm text-indigo-100"><ShieldCheck size={18}/> Secure role-based access</div></div>
    <div className="flex items-center justify-center bg-slate-50 p-6"><motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md"><div className="mb-8 lg:hidden"><div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-600 text-lg font-black text-white">A</div></div><h2 className="text-3xl font-bold">Welcome back</h2><p className="mt-2 text-sm text-slate-500">Sign in to continue to your portal.</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="block"><span className="mb-2 block text-sm font-semibold">Email address</span><div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"><Mail size={18} className="text-slate-400"/><input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@school.com" className="w-full bg-transparent px-3 py-3 text-sm outline-none"/></div></label><label className="block"><span className="mb-2 block text-sm font-semibold">Password</span><div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"><LockKeyhole size={18} className="text-slate-400"/><input required type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent px-3 py-3 text-sm outline-none"/><button type="button" onClick={() => setShow(value => !value)} className="text-slate-400">{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label><div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</Link></div><Button type="submit" className="w-full">Sign in <ArrowRight size={17}/></Button></form><p className="mt-8 text-center text-xs text-slate-400">© 2026 Attendly. All rights reserved.</p></motion.div></div>
  </div>
}
