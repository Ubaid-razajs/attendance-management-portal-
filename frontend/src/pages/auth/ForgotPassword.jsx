import { useState } from 'react'
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"><ArrowLeft size={16}/> Back to login</Link><div className="mt-8 grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><ShieldCheck size={22}/></div><h1 className="mt-5 text-2xl font-bold">Reset your password</h1><p className="mt-2 text-sm leading-6 text-slate-500">Enter your account email and we’ll send instructions to reset your password.</p>{submitted?<div className="mt-7 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">If an account exists for <strong>{email}</strong>, reset instructions will be sent shortly.</div>:<form onSubmit={submit} className="mt-7 space-y-5"><label className="block"><span className="mb-2 block text-sm font-semibold">Email address</span><div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"><Mail size={18} className="text-slate-400"/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@school.com" className="w-full bg-transparent px-3 py-3 text-sm outline-none"/></div></label><Button type="submit" className="w-full">Send reset instructions <ArrowRight size={17}/></Button></form>}</motion.div></div>
}
