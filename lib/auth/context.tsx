"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User, Session, UserRole } from "@/lib/types"
import { authApi, unwrapSingle } from "@/lib/api"

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

function normalizeSession(payload: unknown): Session | null {
  if (!payload || typeof payload !== "object") return null

  const boxed = payload as {
    session?: Session
    data?: Session | { session?: Session; user?: User; token?: string; expiresAt?: string }
    user?: User
    token?: string
    expiresAt?: string
  }

  if (boxed.session) return boxed.session
  if (boxed.data && typeof boxed.data === "object" && "session" in boxed.data && boxed.data.session) {
    return boxed.data.session as Session
  }

  const user = unwrapSingle<User>(payload)
  const token = boxed.token || (boxed.data && typeof boxed.data === "object" && "token" in boxed.data ? boxed.data.token : undefined)
  const expiresAt =
    boxed.expiresAt ||
    (boxed.data && typeof boxed.data === "object" && "expiresAt" in boxed.data ? boxed.data.expiresAt : undefined) ||
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  if (!user || typeof token !== "string") return null

  return {
    user,
    token,
    expiresAt,
  }
}

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
      const data = await authApi.login({ email, password })
      const nextSession = normalizeSession(data)

      if (nextSession) {
        setSession(nextSession)
        setUser(nextSession.user)
        localStorage.setItem("nozah_session", JSON.stringify(nextSession))
        return { success: true }
      }
      return { success: false, error: data.error || "Login failed" }
    } catch {
      return { success: false, error: "Network error" }
    }
  }, [])

  const staffLogin = useCallback(async (email: string, password: string) => {
    try {
      const data = await authApi.loginStaff({ email, password })
      const nextSession = normalizeSession(data)

      if (nextSession) {
        setSession(nextSession)
        setUser(nextSession.user)
        localStorage.setItem("nozah_session", JSON.stringify(nextSession))
        return { success: true }
      }
      return { success: false, error: data.error || "Login failed" }
    } catch {
      return { success: false, error: "Network error" }
    }
  }, [])

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      const data = await authApi.register({ email, password, fullName, name: fullName })
      const nextSession = normalizeSession(data)

      if (nextSession) {
        setSession(nextSession)
        setUser(nextSession.user)
        localStorage.setItem("nozah_session", JSON.stringify(nextSession))
        return { success: true }
      }
      return { success: false, error: data.error || "Registration failed" }
    } catch {
      return { success: false, error: "Network error" }
    }
  }, [])

  const staffRegister = useCallback(async (email: string, password: string, fullName: string, role: UserRole) => {
    try {
      const data = await authApi.registerStaff({ email, password, fullName, name: fullName, role })
      const nextSession = normalizeSession(data)

      if (nextSession) {
        setSession(nextSession)
        setUser(nextSession.user)
        localStorage.setItem("nozah_session", JSON.stringify(nextSession))
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
