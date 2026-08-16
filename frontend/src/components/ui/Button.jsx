import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
  danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
  ghost: 'text-slate-600 hover:bg-slate-100',
}

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return <motion.button whileTap={{ scale: 0.98 }} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`} {...props}>{children}</motion.button>
}
