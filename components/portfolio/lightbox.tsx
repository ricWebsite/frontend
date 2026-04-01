"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PortfolioItem } from "@/lib/types"

interface LightboxProps {
  item: PortfolioItem
  items: PortfolioItem[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ item, items, onClose, onPrev, onNext }: LightboxProps) {
  const currentIndex = items.findIndex((i) => i.id === item.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        onClose()
        break
      case "ArrowLeft":
        if (hasPrev) onPrev()
        break
      case "ArrowRight":
        if (hasNext) onNext()
        break
    }
  }, [onClose, onPrev, onNext, hasPrev, hasNext])
  
  useEffect(() => {
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>
      
      {/* Navigation buttons */}
      {hasPrev && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2"
          onClick={onPrev}
        >
          <ChevronLeft className="h-8 w-8" />
          <span className="sr-only">Previous</span>
        </Button>
      )}
      
      {hasNext && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
          onClick={onNext}
        >
          <ChevronRight className="h-8 w-8" />
          <span className="sr-only">Next</span>
        </Button>
      )}
      
      {/* Image and info */}
      <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4">
        <div className="relative aspect-square max-h-[70vh] w-full max-w-3xl overflow-hidden rounded-lg">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain"
            priority
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold">{item.title}</h2>
          <p className="text-muted-foreground capitalize">{item.category.replace("-", " ")}</p>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">{item.description}</p>
        </div>
        
        {/* Counter */}
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} / {items.length}
        </p>
      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  )
}
