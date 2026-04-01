"use client"

import { use, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { shopApi, unwrapCollection } from "@/lib/api"
import { useCart } from "@/lib/store/cart"
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from "lucide-react"
import { ProductCard } from "@/components/shop/product-card"
import type { Product } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const payload = await shopApi.getProducts()
        setProducts(unwrapCollection<Product>(payload))
        setHasError(false)
      } catch {
        setProducts([])
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    void loadProducts()
  }, [])

  const product = useMemo(() => products.find((entry) => entry.id === id), [products, id])
  
  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center px-4 py-16">
        <Spinner />
      </div>
    )
  }

  if (!product || hasError) {
    notFound()
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price)
  }
  
  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }
  
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Link href="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>
      
      {/* Product details */}
      <div className="mb-16 grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground capitalize">{product.category}</span>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
          
          <p className="mt-6 text-muted-foreground">{product.description}</p>
          
          {/* Stock status */}
          <div className="mt-6">
            {product.stock > 10 ? (
              <span className="text-sm text-green-500">In Stock</span>
            ) : product.stock > 0 ? (
              <span className="text-sm text-amber-500">Only {product.stock} left in stock</span>
            ) : (
              <span className="text-sm text-destructive">Out of Stock</span>
            )}
          </div>
          
          {/* Quantity selector */}
          {product.stock > 0 && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Add to cart */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart - {formatPrice(product.price * quantity)}
                </>
              )}
            </Button>
          </div>
          
          {/* Additional info */}
          <Card className="mt-8">
            <CardContent className="p-4">
              <h3 className="mb-2 font-medium">Shipping Information</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Free shipping within Nairobi for orders over KES 5,000</li>
                <li>Standard shipping: 3-5 business days</li>
                <li>International shipping available</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
