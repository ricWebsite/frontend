import { NextResponse } from "next/server"
import { findUserByEmail, mockUsers } from "@/lib/data/users"
import type { Session, User } from "@/lib/types"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json()
    
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      )
    }
    
    // Check if user exists
    const existing = findUserByEmail(email)
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      )
    }
    
    // Create new user (in mock data)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      role: "user",
      createdAt: new Date().toISOString(),
    }
    
    // Add to mock users (in real app this would be a database insert)
    mockUsers.push({ ...newUser, password })
    
    // Create session
    const session: Session = {
      user: newUser,
      token: `mock-token-${newUser.id}-${Date.now()}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
    
    // Set cookie for middleware
    const cookieStore = await cookies()
    cookieStore.set("nozah_session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })
    
    return NextResponse.json({ success: true, session })
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
