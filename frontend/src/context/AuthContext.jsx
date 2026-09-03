import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { ROLES } from '../constants/roles'
import authService from '../services/authService'
import { TOKEN_KEY } from '../services/api'

export const AuthContext = createContext(null)
const STORAGE_KEY = 'attendance_portal_session'

function readSession() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession)
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)))

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) { setLoading(false); return }
    authService.me()
      .then((response) => { setUser(response.user); localStorage.setItem(STORAGE_KEY, JSON.stringify(response.user)) })
      .catch(() => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(STORAGE_KEY); setUser(null) })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (credentials) => {
    const response = await authService.login(credentials)
    localStorage.setItem(TOKEN_KEY, response.token)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response.user))
    setUser(response.user)
    return response.user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, isAuthenticated: Boolean(user), login, logout, roles: ROLES }), [user, loading, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthContext
