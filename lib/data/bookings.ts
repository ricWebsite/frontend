import type { Booking } from "@/lib/types"

export const bookings: Booking[] = [
  {
    id: "booking-1",
    userId: "user-1",
    userName: "John Doe",
    userEmail: "john@example.com",
    serviceType: "tattoo-consultation",
    date: "2024-04-15",
    time: "10:00",
    notes: "Interested in a geometric sleeve design incorporating African patterns",
    status: "confirmed",
    createdAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "booking-2",
    userId: "user-2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    serviceType: "portrait-commission",
    date: "2024-04-20",
    time: "14:00",
    notes: "Want a pen portrait of my parents for their anniversary",
    status: "pending",
    createdAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "booking-3",
    userId: "user-3",
    userName: "Michael Ochieng",
    userEmail: "michael@example.com",
    serviceType: "tattoo-session",
    date: "2024-04-18",
    time: "11:00",
    notes: "Continuation of back piece - second session",
    status: "confirmed",
    createdAt: "2024-03-18T09:15:00Z",
  },
]

export function getBookings(status?: string) {
  if (!status || status === "all") return bookings
  return bookings.filter((b) => b.status === status)
}

export function getBookingsByUser(userId: string) {
  return bookings.filter((b) => b.userId === userId)
}

export function getBooking(id: string) {
  return bookings.find((b) => b.id === id)
}

export const serviceTypes = [
  { value: "tattoo-consultation", label: "Tattoo Consultation", duration: "30 min", price: "Free" },
  { value: "tattoo-session", label: "Tattoo Session", duration: "2-4 hours", price: "Starting from KES 5,000" },
  { value: "custom-artwork", label: "Custom Artwork", duration: "Varies", price: "Starting from KES 10,000" },
  { value: "portrait-commission", label: "Portrait Commission", duration: "2-3 weeks", price: "Starting from KES 25,000" },
]
