import type { Review } from "@/lib/types"

export const reviews: Review[] = [
  {
    id: "review-1",
    userId: "user-1",
    userName: "John Doe",
    content: "Nozah is an incredible artist! Got my first tattoo from him and the experience was amazing. He took the time to understand exactly what I wanted and created something truly unique. The attention to detail is unmatched.",
    rating: 5,
    approved: true,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "review-2",
    userId: "user-2",
    userName: "Jane Smith",
    content: "Purchased a canvas print for my living room and it's absolutely stunning. The colors are vibrant and the quality is exceptional. Shipping was fast and the packaging was secure. Highly recommend!",
    rating: 5,
    approved: true,
    createdAt: "2024-03-10T14:30:00Z",
  },
  {
    id: "review-3",
    userId: "user-3",
    userName: "Michael Ochieng",
    content: "As a fellow Kenyan artist, I have immense respect for Nozah's work. The way he blends traditional African elements with contemporary design is inspiring. His exhibition at the National Museum was phenomenal.",
    rating: 5,
    approved: true,
    createdAt: "2024-03-05T09:15:00Z",
  },
  {
    id: "review-4",
    userId: "user-4",
    userName: "Sarah Wanjiku",
    content: "Commissioned a portrait of my grandmother and it brought tears to my eyes. Nozah captured her spirit perfectly. The pen work is incredibly detailed and the likeness is amazing. A true treasure!",
    rating: 5,
    approved: true,
    createdAt: "2024-02-28T16:45:00Z",
  },
  {
    id: "review-5",
    userId: "user-5",
    userName: "David Kimani",
    content: "Great tattoo work! Professional, clean studio, and the design exceeded my expectations. Would definitely recommend to anyone looking for quality tattoo art in Nairobi.",
    rating: 4,
    approved: true,
    createdAt: "2024-02-20T11:00:00Z",
  },
  {
    id: "review-6",
    userId: "user-6",
    userName: "Amina Hassan",
    content: "The art book is a beautiful collection. It's clear how much thought and passion goes into each piece. A must-have for any art lover or collector of African contemporary art.",
    rating: 5,
    approved: true,
    createdAt: "2024-02-15T13:20:00Z",
  },
  {
    id: "review-7",
    userId: "user-7",
    userName: "Peter Mwangi",
    content: "Booking process was easy and Nozah was very responsive. The consultation helped me refine my ideas and the final tattoo is exactly what I envisioned. Will definitely be back for more!",
    rating: 5,
    approved: true,
    createdAt: "2024-02-10T10:30:00Z",
  },
  {
    id: "review-8",
    userId: "user-8",
    userName: "Grace Nyambura",
    content: "Bought the digital wallpaper pack and use them everywhere - phone, laptop, tablet. The quality is amazing and they always get compliments. Great value for money!",
    rating: 4,
    approved: true,
    createdAt: "2024-02-05T15:00:00Z",
  },
]

export function getApprovedReviews() {
  return reviews.filter((review) => review.approved)
}

export function getAllReviews() {
  return reviews
}

export function getAverageRating() {
  const approved = getApprovedReviews()
  const total = approved.reduce((sum, review) => sum + review.rating, 0)
  return total / approved.length
}
