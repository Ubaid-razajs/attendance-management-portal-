import { createContext, useCallback, useMemo, useState } from 'react'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'attendance_portal_session'

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession)

  const login = useCallback((credentials) => {
    const session = {
      id: 'admin-001',
      name: 'Admin User',
      email: credentials.email,
      role: 'admin',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setUser(session)
    return session
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
