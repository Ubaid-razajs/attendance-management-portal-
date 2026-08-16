export default function Input({ label, error, className = '', ...props }) {
  return <label className="block w-full"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span><input className={`w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 ${error ? 'border-rose-400' : ''} ${className}`} {...props}/>{error && <span className="mt-1.5 block text-xs text-rose-600">{error}</span>}</label>
}
