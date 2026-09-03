import { useState } from 'react'
import { LockKeyhole, CheckCircle2, AlertCircle } from 'lucide-react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import authService from '../../services/authService'
import { getApiError } from '../../services/api'

export default function ResetPassword() {
  const [params] = useSearchParams(); const navigate = useNavigate()
  const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [done, setDone] = useState(false); const [error, setError] = useState(''); const [saving, setSaving] = useState(false)
  const submit = async (event) => { event.preventDefault(); setError(''); if (password.length < 6) return setError('Password must be at least 6 characters'); if (password !== confirm) return setError('Passwords do not match'); setSaving(true); try { await authService.resetPassword(params.get('token'), password); setDone(true); setTimeout(() => navigate('/login'), 1200) } catch (requestError) { setError(getApiError(requestError)) } finally { setSaving(false) } }
  return <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><LockKeyhole size={22}/></div><h1 className="mt-5 text-2xl font-bold">Create a new password</h1>{done ? <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700"><CheckCircle2 className="mb-2"/>Password changed successfully. Redirecting to login…</div> : <form onSubmit={submit} className="mt-7 space-y-5">{error && <div className="flex gap-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700"><AlertCircle size={18}/>{error}</div>}<input required minLength={6} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" className="control"/><input required minLength={6} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" className="control"/><Button disabled={saving} type="submit" className="w-full">{saving ? 'Saving…' : 'Change password'}</Button><Link to="/login" className="block text-center text-sm font-semibold text-indigo-600">Back to login</Link></form>}</motion.div></div>
}
