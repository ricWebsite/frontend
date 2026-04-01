import { BookingForm } from "@/components/bookings/booking-form"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Phone } from "lucide-react"

const studioInfo = [
  {
    icon: MapPin,
    title: "Location",
    description: "Westlands, Nairobi, Kenya",
  },
  {
    icon: Clock,
    title: "Hours",
    description: "Mon-Sat: 9AM - 6PM",
  },
  {
    icon: Phone,
    title: "Contact",
    description: "+254 700 000 000",
  },
]

export default function BookingsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Book a Session</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Whether you&apos;re looking for a custom tattoo, a portrait commission, or just want to discuss 
          ideas, I&apos;d love to hear from you. Fill out the form below and I&apos;ll get back to you within 24 hours.
        </p>
      </div>
      
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
        {/* Booking form */}
        <div className="lg:col-span-2">
          <BookingForm />
        </div>
        
        {/* Studio info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Studio Information</h2>
          {studioInfo.map((info) => (
            <Card key={info.title}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* What to expect */}
          <Card className="mt-6">
            <CardContent className="p-4">
              <h3 className="mb-3 font-medium">What to Expect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">1.</span>
                  Submit your booking request
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">2.</span>
                  Receive confirmation within 24 hours
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">3.</span>
                  Discuss your ideas in the consultation
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">4.</span>
                  Review custom designs before the session
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
