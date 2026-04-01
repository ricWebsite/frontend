"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Lightbox } from "./lightbox"
import type { PortfolioItem } from "@/lib/types"

interface GalleryGridProps {
  items: PortfolioItem[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const searchParams = useSearchParams()
  
  // Check for highlight param on mount
  useEffect(() => {
    const highlightId = searchParams.get("highlight")
    if (highlightId) {
      const item = items.find((i) => i.id === highlightId)
      if (item) {
        setSelectedItem(item)
      }
    }
  }, [searchParams, items])
  
  const handlePrev = () => {
    if (!selectedItem) return
    const currentIndex = items.findIndex((i) => i.id === selectedItem.id)
    if (currentIndex > 0) {
      setSelectedItem(items[currentIndex - 1])
    }
  }
  
  const handleNext = () => {
    if (!selectedItem) return
    const currentIndex = items.findIndex((i) => i.id === selectedItem.id)
    if (currentIndex < items.length - 1) {
      setSelectedItem(items[currentIndex + 1])
    }
  }
  
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground capitalize">{item.category.replace("-", " ")}</p>
            </div>
          </button>
        ))}
      </div>
      
      {selectedItem && (
        <Lightbox
          item={selectedItem}
          items={items}
          onClose={() => setSelectedItem(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  )
}
