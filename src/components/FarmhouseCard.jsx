export default function FarmhouseCard({ item, onBook }) {
  return (
    <div className="bg-white border border-emerald-900/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      {item.image_url ? (
        <img src={item.image_url} alt={item.name} className="h-44 w-full object-cover" />
      ) : (
        <div className="h-44 w-full bg-emerald-100" />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-emerald-900">{item.name}</h3>
          <div className="text-emerald-700 font-semibold">${item.price_per_night}/night</div>
        </div>
        <p className="text-sm text-emerald-800/80 mt-1 line-clamp-2">{item.description}</p>
        <div className="mt-3 text-sm text-emerald-800/70">
          {item.bedrooms} bd • {item.bathrooms} ba • up to {item.guests} guests
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-sm text-emerald-700">{item.location}</span>
          <button onClick={()=>onBook?.(item)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Book</button>
        </div>
      </div>
    </div>
  )
}
