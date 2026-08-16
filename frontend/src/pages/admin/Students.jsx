import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, SlidersHorizontal, MoreHorizontal, Eye, Pencil, UserRound } from 'lucide-react'
import Badge from '../../components/ui/Badge'

const students = [
  ['ST-1001', 'Ahmed Khan', '10-A', 'ahmed.khan@school.com', 'Present'],
  ['ST-1002', 'Sara Ahmed', '9-B', 'sara.ahmed@school.com', 'Present'],
  ['ST-1003', 'Hamza Ali', '8-A', 'hamza.ali@school.com', 'Late'],
  ['ST-1004', 'Maham Raza', '10-B', 'maham.raza@school.com', 'Present'],
  ['ST-1005', 'Usman Tariq', '7-C', 'usman.tariq@school.com', 'Absent'],
  ['ST-1006', 'Areeba Noor', '9-A', 'areeba.noor@school.com', 'Present'],
  ['ST-1007', 'Hassan Rauf', '8-B', 'hassan.rauf@school.com', 'Present'],
]

export default function Students() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => students.filter(s => s.join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="mx-auto max-w-7xl space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-bold">Students</h2><p className="mt-1 text-sm text-slate-500">Manage student records, classes and attendance profiles.</p></div><Link to="/admin/students/add" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"><Plus size={17}/> Add student</Link></div>
    <div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Total students</p><p className="mt-1 text-2xl font-bold">1,248</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Active students</p><p className="mt-1 text-2xl font-bold">1,232</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">New this month</p><p className="mt-1 text-2xl font-bold">24</p></div></div>
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between"><div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:max-w-md"><Search size={18} className="text-slate-400"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students..." className="w-full bg-transparent text-sm outline-none"/></div><button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"><SlidersHorizontal size={17}/> Filters</button></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">ID</th><th className="px-5 py-3">Class</th><th className="px-5 py-3">Email</th><th className="px-5 py-3">Today</th><th className="px-5 py-3">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map(([id, name, cls, email, status]) => <tr key={id} className="hover:bg-slate-50"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-50 text-indigo-600"><UserRound size={17}/></div><span className="font-semibold">{name}</span></div></td><td className="px-5 py-4 text-slate-500">{id}</td><td className="px-5 py-4 text-slate-500">{cls}</td><td className="px-5 py-4 text-slate-500">{email}</td><td className="px-5 py-4"><Badge status={status.toLowerCase()}>{status}</Badge></td><td className="px-5 py-4"><div className="flex items-center gap-1"><Link to={`/admin/students/${id}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"><Eye size={17}/></Link><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"><Pencil size={17}/></button><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={17}/></button></div></td></tr>)}</tbody></table></div></section>
  </div>
}
