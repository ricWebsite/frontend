"use client"

import { useState } from "react"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { serviceTypes } from "@/lib/data/bookings"
import type { ServiceType } from "@/lib/types"

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
]

export function BookingForm() {
  const { user } = useAuth()
  const [serviceType, setServiceType] = useState<ServiceType | "">("")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const selectedService = serviceTypes.find((s) => s.value === serviceType)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!serviceType || !date || !time) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSuccess(true)
  }
  
  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Booking Submitted!</h2>
          <p className="mb-6 text-muted-foreground">
            Your booking request has been received. You&apos;ll receive a confirmation email shortly.
          </p>
          <div className="rounded-lg bg-muted p-4 text-left">
            <p><strong>Service:</strong> {selectedService?.label}</p>
            <p><strong>Date:</strong> {date && format(date, "MMMM d, yyyy")}</p>
            <p><strong>Time:</strong> {time}</p>
          </div>
          <Button className="mt-6" onClick={() => {
            setIsSuccess(false)
            setServiceType("")
            setDate(undefined)
            setTime("")
            setNotes("")
          }}>
            Book Another Session
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Book a Session</CardTitle>
        <CardDescription>
          Select your preferred service, date, and time. I&apos;ll get back to you within 24 hours to confirm.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Service type */}
            <Field>
              <FieldLabel>Service Type</FieldLabel>
              <Select value={serviceType} onValueChange={(v) => setServiceType(v as ServiceType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      <div className="flex flex-col">
                        <span>{service.label}</span>
                        <span className="text-xs text-muted-foreground">{service.duration} - {service.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            
            {/* Date picker */}
            <Field>
              <FieldLabel>Preferred Date</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMMM d, yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </Field>
            
            {/* Time slot */}
            <Field>
              <FieldLabel>Preferred Time</FieldLabel>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            
            {/* Contact info (pre-filled for logged in users) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Your Name</FieldLabel>
                <Input
                  value={user?.fullName || ""}
                  disabled
                  placeholder="Your name"
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  value={user?.email || ""}
                  disabled
                  placeholder="Your email"
                />
              </Field>
            </div>
            
            {/* Notes */}
            <Field>
              <FieldLabel>Additional Notes (Optional)</FieldLabel>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell me about your ideas, reference images, or any questions you have..."
                rows={4}
              />
            </Field>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !serviceType || !date || !time}
            >
              {isLoading ? <Spinner className="mr-2" /> : null}
              Submit Booking Request
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
