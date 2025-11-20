import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import FarmhouseCard from './components/FarmhouseCard'
import BookingModal from './components/BookingModal'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [items, setItems] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`${API_BASE}/api/farmhouses`)
        const data = await res.json()
        const items = data.items || []
        setItems(items)
        setFiltered(items)
      } catch (e) {
        setError('Failed to load listings')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const onSearch = (q) => {
    if (!q?.location) return setFiltered(items)
    const term = q.location.toLowerCase()
    setFiltered(items.filter(i => i.location?.toLowerCase().includes(term)))
  }

  const onConfirmBooking = async (payload) => {
    try {
      setMessage('')
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Booking failed')
      setSelected(null)
      setMessage('Booking confirmed! Check your email for details.')
    } catch (e) {
      setMessage(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero onSearch={onSearch} />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Featured farmhouses</h2>
          {loading && <span className="text-emerald-700 text-sm">Loading...</span>}
        </div>

        {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}
        {message && <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg">{message}</div>}

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <FarmhouseCard key={item.id} item={item} onBook={setSelected} />
          ))}
        </div>

        {!loading && filtered.length === 0 && (
          <div className="mt-10 text-emerald-800/70">No farmhouses found for your search.</div>
        )}
      </section>

      <BookingModal open={!!selected} farmhouse={selected} onClose={()=>setSelected(null)} onConfirm={onConfirmBooking} />

      <footer className="border-t border-emerald-900/10 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-emerald-800/80 text-sm">© {new Date().getFullYear()} Farmstay. All rights reserved.</div>
          <div className="flex items-center gap-6 text-emerald-800/70 text-sm">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
