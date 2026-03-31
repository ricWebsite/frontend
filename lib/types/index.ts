// User and Auth Types
export type UserRole = "user" | "admin" | "superadmin"

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  avatarUrl?: string
  createdAt: string
}

export interface Session {
  user: User
  token: string
  expiresAt: string
}

// Portfolio Types
export type PortfolioCategory = "tattoos" | "digital-art" | "pen-art" | "contemporary"

export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: PortfolioCategory
  imageUrl: string
  createdAt: string
}

// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
  category: string
  createdAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

// Order Types
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"

export interface CustomerInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
}

export interface Order {
  id: string
  userId?: string
  items: CartItem[]
  total: number
  status: OrderStatus
  customerInfo: CustomerInfo
  createdAt: string
}

// Booking Types
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"
export type ServiceType = "tattoo-consultation" | "tattoo-session" | "custom-artwork" | "portrait-commission"

export interface Booking {
  id: string
  userId: string
  userName: string
  userEmail: string
  serviceType: ServiceType
  date: string
  time: string
  notes?: string
  status: BookingStatus
  createdAt: string
}

// Blog Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  imageUrl?: string
  authorId: string
  authorName: string
  published: boolean
  createdAt: string
}

export interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

// Review Types
export interface Review {
  id: string
  userId: string
  userName: string
  content: string
  rating: number
  approved: boolean
  createdAt: string
}
