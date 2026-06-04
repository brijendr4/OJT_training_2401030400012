import React, { createContext, useContext, useReducer } from 'react'

const CartState = createContext(null)
const CartDispatch = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, size, qty } = action.payload
      const key = `${product._id || product.id}::${size}`
      const existing = state.items[key]
      const newQty = (existing ? existing.qty : 0) + qty
      return { ...state, items: { ...state.items, [key]: { product, size, qty: newQty } } }
    }
    case 'REMOVE': {
      const { key } = action.payload
      const items = { ...state.items }
      delete items[key]
      return { ...state, items }
    }
    case 'SET_QTY': {
      const { key, qty } = action.payload
      const items = { ...state.items }
      if (items[key]) items[key] = { ...items[key], qty }
      return { ...state, items }
    }
    case 'CLEAR':
      return { items: {} }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: {} })

  const total = Object.values(state.items).reduce((s, it) => s + it.product.price * it.qty, 0)
  const count = Object.values(state.items).reduce((s, it) => s + it.qty, 0)

  return (
    <CartDispatch.Provider value={dispatch}>
      <CartState.Provider value={{ ...state, total, count }}>
        {children}
      </CartState.Provider>
    </CartDispatch.Provider>
  )
}

export const useCart = () => useContext(CartState)
export const useCartDispatch = () => useContext(CartDispatch)
