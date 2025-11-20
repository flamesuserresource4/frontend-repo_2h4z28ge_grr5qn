import { useState } from 'react'

export default function BookingModal({ open, onClose, farmhouse, onConfirm }) {
  const [form, setForm] = useState({ name: '', email: '', check_in: '', check_out: '', guests: 1, notes: '' })

  if (!open) return null

  const submit = () => {
    if (!form.name || !form.email || !form.check_in || !form.check_out) return
    onConfirm?.({ ...form, farmhouse_id: farmhouse.id })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-emerald-900">Book {farmhouse?.name}</h3>
            <p className="text-sm text-emerald-800/70">${farmhouse?.price_per_night}/night</p>
          </div>
          <button onClick={onClose} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-4">
          <input className="px-3 py-2 rounded-lg border" placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="px-3 py-2 rounded-lg border" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <div className="grid grid-cols-2 gap-3">
            <input type="date" className="px-3 py-2 rounded-lg border" value={form.check_in} onChange={e=>setForm({...form, check_in:e.target.value})} />
            <input type="date" className="px-3 py-2 rounded-lg border" value={form.check_out} onChange={e=>setForm({...form, check_out:e.target.value})} />
          </div>
          <input type="number" min="1" className="px-3 py-2 rounded-lg border" value={form.guests} onChange={e=>setForm({...form, guests:Number(e.target.value)})} />
          <textarea className="px-3 py-2 rounded-lg border" placeholder="Notes (optional)" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button onClick={submit} className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Confirm</button>
        </div>
      </div>
    </div>
  )
}
