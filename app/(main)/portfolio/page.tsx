"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { GalleryGrid } from "@/components/portfolio/gallery-grid"
import { portfolioItems } from "@/lib/data/portfolio"
import type { PortfolioCategory } from "@/lib/types"

const categories: { value: PortfolioCategory | "all"; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "tattoos", label: "Tattoos" },
  { value: "digital-art", label: "Digital Art" },
  { value: "pen-art", label: "Pen Art" },
  { value: "contemporary", label: "Contemporary" },
]

function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | "all">("all")
  
  const filteredItems = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory)
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Portfolio</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Explore my collection of tattoos, digital art, pen illustrations, and contemporary pieces.
          Each work tells a unique story rooted in African heritage and modern aesthetics.
        </p>
      </div>
      
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={activeCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>
      
      {/* Gallery */}
      {filteredItems.length > 0 ? (
        <GalleryGrid items={filteredItems} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No items found in this category.</p>
        </div>
      )}
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 h-12 w-48 animate-pulse rounded bg-muted" />
          <div className="mx-auto h-6 w-96 animate-pulse rounded bg-muted" />
        </div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  )
}
