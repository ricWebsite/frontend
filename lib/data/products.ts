import type { Product } from "@/lib/types"

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Geometric Lion Print",
    description: "High-quality giclée print of the iconic Geometric Lion tattoo design. Printed on archival paper.",
    price: 4500,
    imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    stock: 25,
    category: "prints",
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "prod-2",
    name: "Abstract Portrait Canvas",
    description: "Large format canvas print of the Abstract Portrait digital artwork. Gallery wrapped, ready to hang.",
    price: 12000,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    stock: 10,
    category: "canvas",
    createdAt: "2024-03-05T14:30:00Z",
  },
  {
    id: "prod-3",
    name: "Wildlife Pen Art Set",
    description: "Set of 4 pen art prints featuring African wildlife. Each print is A4 size on premium paper.",
    price: 8000,
    imageUrl: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80",
    stock: 15,
    category: "prints",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: "prod-4",
    name: "Nairobi Skyline Poster",
    description: "Vibrant poster print of the Nairobi Skyline digital art. Available in A2 size.",
    price: 3500,
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    stock: 50,
    category: "posters",
    createdAt: "2024-03-12T16:45:00Z",
  },
  {
    id: "prod-5",
    name: "Custom Portrait Commission",
    description: "Commission a custom pen portrait. Price includes consultation and one revision. Delivery in 2-3 weeks.",
    price: 25000,
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    stock: 5,
    category: "commissions",
    createdAt: "2024-03-15T11:00:00Z",
  },
  {
    id: "prod-6",
    name: "Art Book: Nozah Collection",
    description: "200-page hardcover book featuring Nozah&apos;s complete portfolio with artist commentary.",
    price: 6500,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    stock: 30,
    category: "books",
    createdAt: "2024-03-18T13:20:00Z",
  },
  {
    id: "prod-7",
    name: "Tribal Patterns Sticker Pack",
    description: "Pack of 10 vinyl stickers featuring tribal pattern designs. Waterproof and UV resistant.",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80",
    stock: 100,
    category: "merchandise",
    createdAt: "2024-03-20T10:30:00Z",
  },
  {
    id: "prod-8",
    name: "Digital Art Wallpaper Pack",
    description: "Collection of 10 digital art pieces optimized for desktop and mobile wallpapers. Instant download.",
    price: 1500,
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&q=80",
    stock: 999,
    category: "digital",
    createdAt: "2024-03-22T15:00:00Z",
  },
]

export function getProducts(category?: string) {
  if (!category || category === "all") return products
  return products.filter((p) => p.category === category)
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function getProductCategories() {
  return [...new Set(products.map((p) => p.category))]
}
