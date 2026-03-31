"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User, Session, UserRole } from "@/lib/types"

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  staffLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>
  staffRegister: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAdmin: boolean
  isSuperAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("nozah_session")
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Session
        if (new Date(parsed.expiresAt) > new Date()) {
          setSession(parsed)
          setUser(parsed.user)
        } else {
          localStorage.removeItem("nozah_session")
        }
      } catch {
        localStorage.removeItem("nozah_session")
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      
      if (data.success && data.session) {
        setSession(data.session)
        setUser(data.session.user)
        localStorage.setItem("nozah_session", JSON.stringify(data.session))
        return { success: true }
      }
      return { success: false, error: data.error || "Login failed" }
    } catch {
      return { success: false, error: "Network error" }
    }
  }, [])

  const staffLogin = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      
      if (data.success && data.session) {
        setSession(data.session)
        setUser(data.session.user)
        localStorage.setItem("nozah_session", JSON.stringify(data.session))
        return { success: true }
      }
      return { success: false, error: data.error || "Login failed" }
    } catch {
      return { success: false, error: "Network error" }
    }
  }, [])

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      })
      const data = await res.json()
      
      if (data.success && data.session) {
        setSession(data.session)
        setUser(data.session.user)
        localStorage.setItem("nozah_session", JSON.stringify(data.session))
        return { success: true }
      }
      return { success: false, error: data.error || "Registration failed" }
    } catch {
      return { success: false, error: "Network error" }
    }
  }, [])

  const staffRegister = useCallback(async (email: string, password: string, fullName: string, role: UserRole) => {
    try {
      const res = await fetch("/api/auth/staff/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName, role }),
      })
      const data = await res.json()
      
      if (data.success && data.session) {
        setSession(data.session)
        setUser(data.session.user)
        localStorage.setItem("nozah_session", JSON.stringify(data.session))
        return { success: true }
      }
      return { success: false, error: data.error || "Registration failed" }
    } catch {
      return { success: false, error: "Network error" }
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setSession(null)
    localStorage.removeItem("nozah_session")
  }, [])

  const isAdmin = user?.role === "admin" || user?.role === "superadmin"
  const isSuperAdmin = user?.role === "superadmin"

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        login,
        staffLogin,
        register,
        staffRegister,
        logout,
        isAdmin,
        isSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
