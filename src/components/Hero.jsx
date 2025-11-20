import { motion } from 'framer-motion'

export default function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100 via-emerald-50 to-white" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-green-200/40 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-emerald-900"
        >
          Book My Paradise
        </motion.h1>
        <p className="mt-2 text-emerald-700 font-semibold uppercase tracking-wide text-sm">Farmhouse stays</p>
        <p className="mt-3 text-emerald-800/80 text-lg md:text-xl max-w-2xl">
          Browse handpicked countryside stays with space to unwind. Easy booking, transparent pricing.
        </p>

        <div className="mt-8 bg-white/90 backdrop-blur border border-emerald-900/10 shadow-lg rounded-2xl p-3">
          <div className="grid md:grid-cols-4 gap-3">
            <input className="px-4 py-3 rounded-xl border border-emerald-900/10 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Where to? (city, area)" onChange={(e)=>onSearch?.({ location: e.target.value })} />
            <input type="date" className="px-4 py-3 rounded-xl border border-emerald-900/10 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            <input type="date" className="px-4 py-3 rounded-xl border border-emerald-900/10 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            <button className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">Search</button>
          </div>
        </div>
      </div>
    </section>
  )
}
