import { NextResponse } from "next/server"
import { bookings } from "@/lib/data/bookings"
import type { Booking } from "@/lib/types"

export async function GET() {
  return NextResponse.json({ bookings })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, userName, userEmail, serviceType, date, time, notes } = body
    
    if (!userId || !serviceType || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      userId,
      userName,
      userEmail,
      serviceType,
      date,
      time,
      notes,
      status: "pending",
      createdAt: new Date().toISOString(),
    }
    
    // In a real app, this would be saved to a database
    bookings.push(newBooking)
    
    return NextResponse.json({ success: true, booking: newBooking })
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
