"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { useCart } from "@/lib/store/cart"
import { useAuth } from "@/lib/auth/context"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Empty } from "@/components/ui/empty"

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "Kenya",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderId, setOrderId] = useState("")
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price)
  }
  
  const shippingCost = total >= 5000 ? 0 : 500
  const orderTotal = total + shippingCost
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    const newOrderId = `ORD-${Date.now()}`
    setOrderId(newOrderId)
    clearCart()
    setIsLoading(false)
    setIsSuccess(true)
  }
  
  if (items.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Empty
          title="Your cart is empty"
          description="Add some items to your cart before checking out."
          action={
            <Link href="/shop">
              <Button className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          }
        />
      </div>
    )
  }
  
  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
          <p className="mb-6 text-muted-foreground">
            Thank you for your order. We&apos;ve sent a confirmation email to {formData.email}.
          </p>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-lg font-semibold">{orderId}</p>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground">
                You&apos;ll receive shipping updates via email. For questions, contact us at orders@nozah.art
              </p>
            </CardContent>
          </Card>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link href="/home">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Link href="/shop/cart" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>
      
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel>Full Name</FieldLabel>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Field>
                  </div>
                  
                  <Field>
                    <FieldLabel>Phone Number</FieldLabel>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+254 700 000 000"
                      required
                    />
                  </Field>
                  
                  <Field>
                    <FieldLabel>Address</FieldLabel>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                  </Field>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel>City</FieldLabel>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Country</FieldLabel>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </Field>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
            
            {/* Payment notice */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="mb-2 font-medium">Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Payment will be collected upon delivery or via M-Pesa. You&apos;ll receive payment 
                  instructions via email after placing your order.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Order summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-muted">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(orderTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Spinner className="mr-2" /> : null}
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
