"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ShoppingBag, MessageSquare, Palette, ArrowRight } from "lucide-react"

const quickActions = [
  {
    icon: Calendar,
    title: "Book a Session",
    description: "Schedule a consultation or tattoo appointment",
    href: "/bookings",
  },
  {
    icon: ShoppingBag,
    title: "Browse Shop",
    description: "Explore prints, art books, and merchandise",
    href: "/shop",
  },
  {
    icon: Palette,
    title: "View Portfolio",
    description: "See my latest tattoos and artwork",
    href: "/portfolio",
  },
  {
    icon: MessageSquare,
    title: "Leave a Review",
    description: "Share your experience with others",
    href: "/reviews",
  },
]

export default function UserHomePage() {
  const { user } = useAuth()
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Welcome section */}
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
          Welcome back, {user?.fullName?.split(" ")[0] || "there"}!
        </h1>
        <p className="text-muted-foreground">
          What would you like to do today?
        </p>
      </div>
      
      {/* Quick actions */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Recent activity / info cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
            <CardDescription>Manage your upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              You have no upcoming bookings.
            </p>
            <Link href="/bookings">
              <Button variant="outline" className="gap-2">
                Book Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>Track your purchases and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              No orders yet. Check out our shop for prints and merchandise.
            </p>
            <Link href="/shop">
              <Button variant="outline" className="gap-2">
                Browse Shop
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
