import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartDispatch } from '../context/CartContext'
import { FaHeart, FaShoppingBag } from 'react-icons/fa'

export default function ProductCard({ product }) {
  const dispatch = useCartDispatch()
  const [size, setSize] = useState(product.sizes?.[0] || '')
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  function add(e) {
    e.preventDefault()
    dispatch({ type: 'ADD', payload: { product, size, qty: 1 } })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const pid = product._id || product.id

  return (
    <div className="shadow-soft shadow-soft-hover p-4 flex flex-col justify-between h-full bg-[#e6e8ec] border border-white/60 relative">
      
      {/* Badge container top left */}
      <div className="absolute top-6 left-6 z-10">
        {product.featured && (
          <span className="badge badge-dark">
            Featured
          </span>
        )}
      </div>

      {/* Wishlist round button */}
      <button 
        onClick={(e) => { e.preventDefault(); setWishlist(!wishlist) }}
        className="absolute top-6 right-6 z-10 btn btn-icon-only btn-pill btn-primary"
        aria-label="Wishlist toggle"
      >
        <FaHeart className={wishlist ? 'text-red-500' : 'text-zinc-400'} />
      </button>

      <div>
        <Link to={`/product/${pid}`} className="no-underline block">
          <div className="rounded-xl overflow-hidden aspect-[4/5] bg-zinc-200 shadow-inner mb-4 relative p-1.5 border border-white/40">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-lg" 
              loading="lazy"
            />
          </div>
        </Link>

        {/* Title and Price */}
        <div className="flex items-start justify-between gap-3 mb-2 px-1">
          <h3 className="font-extrabold text-sm uppercase tracking-tight text-zinc-800 line-clamp-1">
            <Link to={`/product/${pid}`} className="no-underline text-inherit hover:text-zinc-500">
              {product.name}
            </Link>
          </h3>
          <span className="font-black text-sm text-zinc-900">${product.price.toFixed(2)}</span>
        </div>

        <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed mb-4 px-1 font-semibold">
          {product.description}
        </p>
      </div>

      {/* Options and cart submit button */}
      <div className="mt-auto px-1">
        <div className="flex items-center gap-2">
          {product.sizes && product.sizes.length > 0 && (
            <select 
              value={size} 
              onChange={e => setSize(e.target.value)} 
              className="form-control py-2 px-3 text-xs w-20 bg-[#e6e8ec]"
              aria-label="Select product size"
            >
              {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
          
          <button 
            onClick={add} 
            className={`flex-1 btn btn-primary text-[10px] font-black tracking-wider py-2.5 px-3 uppercase transition-all duration-200 cursor-pointer ${
              added 
                ? 'shadow-inset text-emerald-600 font-extrabold border-emerald-400' 
                : 'text-zinc-800 hover:text-zinc-950'
            }`}
          >
            <FaShoppingBag className="mr-1.5 text-[10px] inline-block" />
            {added ? 'Added ✓' : 'Add'}
          </button>
        </div>
      </div>

    </div>
  )
}
