// Use environment variable so this works in both development and production.
// In development: set in frontend/.env as VITE_API_URL=http://localhost:5000/api
// In production: set in your hosting provider's environment variables.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getHeaders() {
  const headers = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('ff_token')
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: getHeaders(),
    ...options
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Something went wrong')
  return data
}

// Auth
export const authAPI = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  signup: (name, email, password) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  me: () => request('/auth/me')
}

// Products
export const productsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/products${query ? `?${query}` : ''}`)
  },

  getById: (id) => request(`/products/${id}`)
}

// Orders
export const ordersAPI = {
  create: (orderData) =>
    request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),

  getMyOrders: () => request('/orders/me')
}
