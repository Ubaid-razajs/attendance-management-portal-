import { useState } from 'react'
import { ArrowLeft, ArrowRight, Mail, ShieldCheck, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import authService from '../../services/authService'
import { getApiError } from '../../services/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [resetUrl, setResetUrl] = useState('')
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault(); setError('')
    try {
      const response = await authService.forgotPassword(email)
      setResetUrl(response.resetUrl || '')
      setSubmitted(true)
    } catch (requestError) { setError(getApiError(requestError)) }
  }

  return <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"><ArrowLeft size={16}/> Back to login</Link><div className="mt-8 grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><ShieldCheck size={22}/></div><h1 className="mt-5 text-2xl font-bold">Reset your password</h1><p className="mt-2 text-sm leading-6 text-slate-500">Enter your account email and we’ll generate secure reset instructions.</p>{error && <div className="mt-5 flex gap-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700"><AlertCircle size={18}/>{error}</div>}{submitted ? <div className="mt-7 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700"><strong>Reset request created.</strong><p className="mt-1">If the account exists for {email}, use the reset link.</p>{resetUrl && <Link to={resetUrl.replace(window.location.origin, '')} className="mt-3 block break-all font-semibold underline">Open reset page</Link>}</div> : <form onSubmit={submit} className="mt-7 space-y-5"><label className="block"><span className="mb-2 block text-sm font-semibold">Email address</span><div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"><Mail size={18} className="text-slate-400"/><input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@school.com" className="w-full bg-transparent px-3 py-3 text-sm outline-none"/></div></label><Button type="submit" className="w-full">Send reset instructions <ArrowRight size={17}/></Button></form>}</motion.div></div>
}
