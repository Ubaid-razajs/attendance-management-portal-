import { motion } from 'framer-motion'
import { Users, UserCheck, UserX, Clock3, ArrowUpRight, CalendarDays, MoreHorizontal } from 'lucide-react'

const stats = [
  { label: 'Total Students', value: '1,248', change: '+8.2%', icon: Users, tone: 'indigo' },
  { label: 'Present Today', value: '1,086', change: '87.0%', icon: UserCheck, tone: 'emerald' },
  { label: 'Absent Today', value: '104', change: '8.3%', icon: UserX, tone: 'rose' },
  { label: 'Late Arrivals', value: '58', change: '4.6%', icon: Clock3, tone: 'amber' },
]

const attendance = [
  ['08:15 AM', 'Ahmed Khan', 'Grade 10-A', 'Present'],
  ['08:21 AM', 'Sara Ahmed', 'Grade 9-B', 'Present'],
  ['08:32 AM', 'Hamza Ali', 'Grade 8-A', 'Late'],
  ['08:47 AM', 'Maham Raza', 'Grade 10-B', 'Present'],
  ['09:02 AM', 'Usman Tariq', 'Grade 7-C', 'Late'],
]

const tone = { indigo: 'bg-indigo-50 text-indigo-600', emerald: 'bg-emerald-50 text-emerald-600', rose: 'bg-rose-50 text-rose-600', amber: 'bg-amber-50 text-amber-600' }

export default function Dashboard() {
  return <div className="mx-auto max-w-7xl space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm font-medium text-indigo-600">Sunday, August 16, 2026</p><h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Good morning, Admin 👋</h2><p className="mt-1 text-sm text-slate-500">Here’s what’s happening with attendance today.</p></div><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"><CalendarDays size={17}/> View calendar</button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, change, icon: Icon, tone: t }, i) => <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className={`grid h-11 w-11 place-items-center rounded-xl ${tone[t]}`}><Icon size={20}/></div><span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-500"><ArrowUpRight size={13}/>{change}</span></div><p className="mt-5 text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></motion.div>)}</div>
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h3 className="font-bold">Today’s attendance</h3><p className="mt-1 text-xs text-slate-400">Latest check-ins across the school</p></div><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={19}/></button></div><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-3 font-semibold">Time</th><th className="px-5 py-3 font-semibold">Student</th><th className="px-5 py-3 font-semibold">Class</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{attendance.map(([time, name, cls, status]) => <tr key={name} className="hover:bg-slate-50"><td className="px-5 py-4 text-slate-500">{time}</td><td className="px-5 py-4 font-semibold">{name}</td><td className="px-5 py-4 text-slate-500">{cls}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{status}</span></td></tr>)}</tbody></table></div></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h3 className="font-bold">Weekly attendance</h3><p className="mt-1 text-xs text-slate-400">Average attendance rate</p></div><span className="text-xl font-bold text-indigo-600">91.4%</span></div><div className="mt-8 flex h-44 items-end gap-3">{[72, 84, 79, 91, 87, 95, 76].map((height, i) => <div key={i} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-lg bg-indigo-100" style={{ height: `${height}%` }}><div className="h-full rounded-t-lg bg-indigo-500 transition-all" style={{ height: `${Math.max(45, height - 12)}%` }}/></div><span className="text-[11px] text-slate-400">{['M','T','W','T','F','S','S'][i]}</span></div>)}</div></section>
    </div>
    <section className="rounded-2xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-200"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-medium text-indigo-200">Action required</p><h3 className="mt-1 text-xl font-bold">12 leave requests are waiting for review.</h3><p className="mt-1 text-sm text-indigo-100">Review pending requests before the end of the school day.</p></div><button className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-700 hover:bg-indigo-50">Review requests</button></div></section>
  </div>
}
