import { createContext, useCallback, useMemo, useState } from 'react'
import { ROLES } from '../constants/roles'

export const AuthContext = createContext(null)
const STORAGE_KEY = 'attendance_portal_session'

function readSession(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))}catch{return null}}

export function AuthProvider({children}){
  const [user,setUser]=useState(readSession)
  // Demo authentication intentionally stays local; replace this callback with the API login later.
  const login=useCallback((credentials)=>{const session={id:`${credentials.role}-001`,name:credentials.role==='admin'?'Admin User':credentials.role==='teacher'?'Ayesha Malik':'Parent User',email:credentials.email,role:credentials.role};localStorage.setItem(STORAGE_KEY,JSON.stringify(session));setUser(session);return session},[])
  const logout=useCallback(()=>{localStorage.removeItem(STORAGE_KEY);setUser(null)},[])
  const value=useMemo(()=>({user,isAuthenticated:Boolean(user),login,logout,roles:ROLES}),[user,login,logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthContext
