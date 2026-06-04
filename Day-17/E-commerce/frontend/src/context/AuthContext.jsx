import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('ff_token')
    if (token) {
      authAPI.me()
        .then(data => setUser(data.user))
        .catch(() => {
          localStorage.removeItem('ff_token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  async function login(email, password) {
    const data = await authAPI.login(email, password)
    localStorage.setItem('ff_token', data.token)
    setUser(data.user)
    return data.user
  }

  async function signup(name, email, password) {
    const data = await authAPI.signup(name, email, password)
    localStorage.setItem('ff_token', data.token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('ff_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
