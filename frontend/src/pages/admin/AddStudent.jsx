import { ArrowLeft, UserPlus, Save } from 'lucide-react'
import { Link } from 'react-router-dom'

const Field = ({ label, placeholder, type = 'text' }) => (
  <label className="space-y-2"><span className="text-sm font-semibold text-slate-700">{label}</span><input type={type} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" /></label>
)

export default function AddStudent() {
  return <div className="mx-auto max-w-5xl space-y-6">
    <div className="flex items-center gap-3"><Link to="/admin/students" className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"><ArrowLeft size={18}/></Link><div><h2 className="text-2xl font-bold text-slate-900">Add Student</h2><p className="mt-1 text-sm text-slate-500">Create a new student profile and assign their class.</p></div></div>
    <form className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-6 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><UserPlus size={19}/></div><div><h3 className="font-bold">Personal information</h3><p className="text-sm text-slate-500">Basic details of the student.</p></div></div><div className="grid gap-5 md:grid-cols-2"><Field label="First name" placeholder="Ahmed"/><Field label="Last name" placeholder="Khan"/><Field label="Date of birth" type="date"/><Field label="Gender" placeholder="Select gender"/><Field label="Email address" type="email" placeholder="student@school.com"/><Field label="Phone number" placeholder="+92 300 0000000"/></div></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-1 font-bold">Academic information</h3><p className="mb-6 text-sm text-slate-500">Assign the student to a class and record their admission details.</p><div className="grid gap-5 md:grid-cols-2"><Field label="Student ID" placeholder="ST-1008"/><Field label="Class" placeholder="10-A"/><Field label="Admission date" type="date"/><Field label="Roll number" placeholder="24"/></div></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-1 font-bold">Parent / guardian</h3><p className="mb-6 text-sm text-slate-500">Contact information for the primary guardian.</p><div className="grid gap-5 md:grid-cols-2"><Field label="Guardian name" placeholder="Muhammad Khan"/><Field label="Relationship" placeholder="Father"/><Field label="Guardian email" type="email" placeholder="parent@email.com"/><Field label="Guardian phone" placeholder="+92 300 0000000"/></div></section>
      <div className="flex justify-end gap-3"><Link to="/admin/students" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</Link><button type="button" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"><Save size={17}/> Save student</button></div>
    </form>
  </div>
}
