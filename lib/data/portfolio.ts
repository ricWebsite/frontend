import type { PortfolioItem } from "@/lib/types"

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Geometric Lion",
    description: "A powerful geometric lion tattoo combining African tribal elements with modern design",
    category: "tattoos",
    imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "p2",
    title: "Floral Sleeve",
    description: "Intricate floral sleeve design with roses and native Kenyan flowers",
    category: "tattoos",
    imageUrl: "https://images.unsplash.com/photo-1590246814883-57c511e76843?w=800&q=80",
    createdAt: "2024-03-10T14:30:00Z",
  },
  {
    id: "p3",
    title: "Abstract Portrait",
    description: "Digital artwork exploring identity through abstract portraiture",
    category: "digital-art",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    createdAt: "2024-03-08T09:15:00Z",
  },
  {
    id: "p4",
    title: "Nairobi Skyline",
    description: "A digital interpretation of Nairobi at sunset with vibrant colors",
    category: "digital-art",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    createdAt: "2024-03-05T16:45:00Z",
  },
  {
    id: "p5",
    title: "Elder Portrait",
    description: "Detailed pen portrait capturing the wisdom of a Maasai elder",
    category: "pen-art",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    createdAt: "2024-03-01T11:00:00Z",
  },
  {
    id: "p6",
    title: "Wildlife Series",
    description: "Pen and ink illustrations of African wildlife",
    category: "pen-art",
    imageUrl: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80",
    createdAt: "2024-02-28T13:20:00Z",
  },
  {
    id: "p7",
    title: "Urban Fragments",
    description: "Contemporary mixed media exploring urban life in Kenya",
    category: "contemporary",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    createdAt: "2024-02-25T10:30:00Z",
  },
  {
    id: "p8",
    title: "Cultural Fusion",
    description: "A contemporary piece blending traditional and modern African aesthetics",
    category: "contemporary",
    imageUrl: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&q=80",
    createdAt: "2024-02-20T15:00:00Z",
  },
  {
    id: "p9",
    title: "Tribal Patterns",
    description: "Modern tattoo design inspired by traditional East African patterns",
    category: "tattoos",
    imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80",
    createdAt: "2024-02-15T09:45:00Z",
  },
  {
    id: "p10",
    title: "Digital Dreams",
    description: "Surrealist digital art exploring African mythology",
    category: "digital-art",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&q=80",
    createdAt: "2024-02-10T12:00:00Z",
  },
  {
    id: "p11",
    title: "City Streets",
    description: "Detailed pen sketch of Nairobi street life",
    category: "pen-art",
    imageUrl: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=800&q=80",
    createdAt: "2024-02-05T14:15:00Z",
  },
  {
    id: "p12",
    title: "Ancestral Voices",
    description: "Contemporary installation exploring generational stories",
    category: "contemporary",
    imageUrl: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&q=80",
    createdAt: "2024-02-01T11:30:00Z",
  },
]

export function getPortfolioByCategory(category?: string) {
  if (!category || category === "all") return portfolioItems
  return portfolioItems.filter((item) => item.category === category)
}

export function getPortfolioItem(id: string) {
  return portfolioItems.find((item) => item.id === id)
}
