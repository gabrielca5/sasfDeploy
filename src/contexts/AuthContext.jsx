import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getUser,
} from '../services/auth.service'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser())

  const login = useCallback(async (email, senha) => {
    const u = await apiLogin(email, senha)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(() => {
    apiLogout()
    setUser(null)
  }, [])

  const register = useCallback((payload) => apiRegister(payload), [])

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout, register }),
    [user, login, logout, register],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
