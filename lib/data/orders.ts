import type { Order } from "@/lib/types"
import { products } from "./products"

export const orders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    items: [
      { product: products[0], quantity: 1 },
      { product: products[3], quantity: 2 },
    ],
    total: 11500,
    status: "delivered",
    customerInfo: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+254 712 345 678",
      address: "123 Kenyatta Avenue",
      city: "Nairobi",
      country: "Kenya",
    },
    createdAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "order-2",
    userId: "user-2",
    items: [
      { product: products[1], quantity: 1 },
    ],
    total: 12000,
    status: "shipped",
    customerInfo: {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "+254 722 987 654",
      address: "456 Moi Avenue",
      city: "Mombasa",
      country: "Kenya",
    },
    createdAt: "2024-03-15T14:30:00Z",
  },
  {
    id: "order-3",
    items: [
      { product: products[5], quantity: 1 },
      { product: products[6], quantity: 3 },
    ],
    total: 10100,
    status: "pending",
    customerInfo: {
      fullName: "Guest Customer",
      email: "guest@example.com",
      phone: "+254 733 111 222",
      address: "789 Tom Mboya Street",
      city: "Nairobi",
      country: "Kenya",
    },
    createdAt: "2024-03-20T09:15:00Z",
  },
  {
    id: "order-4",
    userId: "user-1",
    items: [
      { product: products[7], quantity: 1 },
    ],
    total: 1500,
    status: "delivered",
    customerInfo: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+254 712 345 678",
      address: "123 Kenyatta Avenue",
      city: "Nairobi",
      country: "Kenya",
    },
    createdAt: "2024-03-05T16:45:00Z",
  },
]

export function getOrders(status?: string) {
  if (!status || status === "all") return orders
  return orders.filter((o) => o.status === status)
}

export function getOrdersByUser(userId: string) {
  return orders.filter((o) => o.userId === userId)
}

export function getOrder(id: string) {
  return orders.find((o) => o.id === id)
}
