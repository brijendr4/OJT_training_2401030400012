import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { FaLock as IconLock, FaUser as IconUser } from 'react-icons/fa'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || ''

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(form.email, form.password)
      nav(redirect ? `/${redirect}` : '/')
    } catch (err) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-main py-16 flex items-center justify-center bg-primary">
      <div className="max-w-md w-full shadow-soft p-8 rounded-3xl border border-white/60 bg-primary">
        
        {/* Rounded inset container for icon */}
        <div className="w-12 h-12 rounded-xl shadow-inset flex items-center justify-center mx-auto mb-4 text-zinc-500 border border-white/50 bg-primary">
          <IconLock className="text-base" />
        </div>

        <h2 className="text-2xl font-black uppercase text-zinc-900 tracking-tight mb-2 text-center">Welcome Back</h2>
        <p className="text-zinc-500 text-xs text-center mb-8 font-medium">Log in to check out and track your premium menswear orders.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">Email Address</label>
            <input 
              required 
              type="email" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
              className="form-control" 
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">Password</label>
            <input 
              required 
              type="password" 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
              className="form-control" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-secondary w-full py-3.5 mt-2 justify-center text-xs tracking-wider"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-zinc-500 font-bold uppercase tracking-wider">
          Don't have an account?{' '}
          <Link to={`/signup${redirect ? `?redirect=${redirect}` : ''}`} className="text-zinc-800 hover:text-zinc-600 no-underline border-b-2 border-zinc-900">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
