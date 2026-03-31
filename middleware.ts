import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require user authentication
const protectedUserRoutes = ["/home", "/bookings"]

// Routes that require admin authentication
const protectedAdminRoutes = [
  "/admin/dashboard",
  "/admin/portfolio",
  "/admin/products",
  "/admin/orders",
  "/admin/bookings",
  "/admin/blog",
  "/admin/reviews",
  "/admin/users",
]

// Admin auth routes (login/register)
const adminAuthRoutes = ["/admin/login", "/admin/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get session from cookie
  const sessionCookie = request.cookies.get("nozah_session")
  let session = null
  
  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie.value)
      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        session = null
      }
    } catch {
      session = null
    }
  }
  
  const isAuthenticated = !!session
  const userRole = session?.user?.role || null
  const isAdmin = userRole === "admin" || userRole === "superadmin"
  
  // Check if trying to access protected user routes without auth
  if (protectedUserRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      url.searchParams.set("returnTo", pathname)
      return NextResponse.redirect(url)
    }
  }
  
  // Check if trying to access protected admin routes
  if (protectedAdminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Not logged in - redirect to admin login
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set("returnTo", pathname)
      return NextResponse.redirect(url)
    }
    
    if (!isAdmin) {
      // Logged in but not admin - redirect to home
      const url = request.nextUrl.clone()
      url.pathname = "/home"
      return NextResponse.redirect(url)
    }
  }
  
  // Check if admin trying to access admin auth routes
  if (adminAuthRoutes.some((route) => pathname === route)) {
    if (isAuthenticated && isAdmin) {
      // Admin already logged in - redirect to dashboard
      const url = request.nextUrl.clone()
      url.pathname = "/admin/dashboard"
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/home/:path*",
    "/bookings/:path*",
    "/admin/:path*",
  ],
}
