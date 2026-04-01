
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shop/product-card"
import { Spinner } from "@/components/ui/spinner"
import type { Product } from "@/lib/types"

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/products")
        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data.items || data)
      } catch (err) {
        console.warn("Using fallback mock data for products")
        const { products: mockData } = await import("@/lib/data/products")
        setProducts(mockData)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProducts()
  }, [])
  
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))]
  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory)
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Shop</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Take a piece of art home with you. Browse prints, canvas artwork, books, and merchandise.
        </p>
      </div>
      
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      )}
          </>
        )}
    </div>
  )
}
