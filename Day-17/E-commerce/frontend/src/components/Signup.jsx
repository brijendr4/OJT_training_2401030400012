import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaUserPlus } from 'react-icons/fa'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const { signup } = useAuth()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || ''

  async function submit(e) {
    e.preventDefault()
    if (form.name.trim().length < 2) {
      setError('Name must be at least 2 characters.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      await signup(form.name.trim(), form.email, form.password)
      toast.success('Account created! Welcome to Fashion & Freedom.')
      nav(redirect ? `/${redirect}` : '/')
    } catch (err) {
      setError(err.message || 'Failed to sign up. Email may already be in use.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-main py-16 flex items-center justify-center bg-primary">
      <div className="max-w-md w-full shadow-soft p-8 rounded-3xl border border-white/60 bg-primary">
        
        <div className="w-12 h-12 rounded-xl shadow-inset flex items-center justify-center mx-auto mb-4 text-zinc-500 border border-white/50 bg-primary">
          <FaUserPlus className="text-base" />
        </div>

        <h1 className="text-2xl font-black uppercase text-zinc-900 tracking-tight mb-2 text-center">Create Account</h1>
        <p className="text-zinc-500 text-xs text-center mb-8 font-medium">Join us for exclusive drops, rapid checkouts, and order tracking.</p>
        
        {error && (
          <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="signup-name" className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">
              Full Name
            </label>
            <input 
              id="signup-name"
              required 
              type="text"
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
              className="form-control" 
              placeholder="John Doe"
              autoComplete="name"
              minLength={2}
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">
              Email Address
            </label>
            <input 
              id="signup-email"
              required 
              type="email" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
              className="form-control" 
              placeholder="name@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">
              Password <span className="text-zinc-300 font-normal normal-case">(min. 6 characters)</span>
            </label>
            <input 
              id="signup-password"
              required 
              type="password" 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
              className="form-control" 
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-secondary w-full py-3.5 mt-2 justify-center text-xs tracking-wider"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-zinc-500 font-bold uppercase tracking-wider">
          Already have an account?{' '}
          <Link to={`/login${redirect ? `?redirect=${redirect}` : ''}`} className="text-zinc-800 hover:text-zinc-600 no-underline border-b-2 border-zinc-900">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
