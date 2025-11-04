/**
 * Shop Page - Product listing and shopping
 */

"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import ProductCard, { ProductData } from '@/components/molecules/ProductCard';
import ShopCart from '@/components/organisms/ShopCart';
import Button from '@/components/atoms/Button';
import { COLORS } from '../../shared/const';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Simulate fetching products
    setTimeout(() => {
      setProducts([
        {
          id: '1',
          name: 'Art Print - Geometric',
          description: 'High-quality art print',
          price: 2500,
          image: 'https://i.pinimg.com/1200x/46/15/3f/46153f73e8b625f9c602303699d67e17.jpg',
          category: 'Prints',
          inStock: true,
          rating: 4.5,
          reviews: 12,
        },
        {
          id: '2',
          name: 'Limited Edition Poster',
          description: 'Exclusive limited edition',
          price: 3500,
          image: 'https://drive.google.com/drive/folders/1c2hRk_DRD3uGRk_sm3X4FhL8ZN3-de-3',
          category: 'Posters',
          inStock: true,
          rating: 5,
          reviews: 8,
        },
        {
          id: '3',
          name: 'Digital Art Pack',
          description: 'Collection of digital designs',
          price: 1500,
          image: 'https://via.placeholder.com/300x300?text=Digital+Pack',
          category: 'Digital',
          inStock: true,
          rating: 4,
          reviews: 5,
        },
        {
          id: '4',
          name: 'Merchandise T-Shirt',
          description: 'Premium quality t-shirt',
          price: 2000,
          image: 'https://via.placeholder.com/300x300?text=T-Shirt',
          category: 'Merchandise',
          inStock: true,
          rating: 4.5,
          reviews: 15,
        },
        {
          id: '5',
          name: 'Canvas Print Large',
          description: 'Large canvas wall art',
          price: 5000,
          image: 'https://via.placeholder.com/300x300?text=Canvas',
          category: 'Prints',
          inStock: false,
          rating: 5,
          reviews: 20,
        },
        {
          id: '6',
          name: 'Sticker Pack',
          description: 'Set of artistic stickers',
          price: 500,
          image: 'https://via.placeholder.com/300x300?text=Stickers',
          category: 'Merchandise',
          inStock: true,
          rating: 4,
          reviews: 3,
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddToCart = (product: ProductData) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div style={{ backgroundColor: COLORS.WHITE }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-40 shadow-md"
        style={{ backgroundColor: COLORS.WHITE }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
         <Link
  href="/"
  className="text-2xl font-bold font-['Great_Vibes']"
  style={{ color: COLORS.PRIMARY }}
>
  Nozah
</Link>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-2 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.BLACK,
              }}
            >
              🛒 Cart ({cartItems.length})
            </button>
           <Link href="/" className="inline-block">
  <Button variant="ghost" size="sm">
    ← Back Home
  </Button>
</Link>

          </div>
        </div>
      </nav>

      {/* Header */}
      <section
        className="py-12 md:py-20"
        style={{
          background: `linear-gradient(135deg, ${COLORS.PRIMARY}40 0%, ${COLORS.ACCENT}40 100%)`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-5xl md:text-6xl font-['Great_Vibes'] mb-4"
            style={{ color: COLORS.BLACK }}
          >
            Shop
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: COLORS.MEDIUM_GRAY }}
          >
            Exclusive art prints, merchandise, and digital products
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {showCart ? (
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-3xl font-['Great_Vibes'] mb-8"
                style={{ color: COLORS.BLACK }}
              >
                Your Cart
              </h2>
              <ShopCart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
              />
              <button
                onClick={() => setShowCart(false)}
                className="mt-6 text-sm font-semibold"
                style={{ color: COLORS.PRIMARY }}
              >
                ← Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              <h2
                className="text-3xl font-['Great_Vibes'] mb-8"
                style={{ color: COLORS.BLACK }}
              >
                Featured Products
              </h2>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg animate-pulse"
                      style={{
                        backgroundColor: COLORS.LIGHT_GRAY,
                        height: '400px',
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onViewDetails={(id) => console.log('View details:', id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12"
        style={{ backgroundColor: COLORS.BLACK, color: COLORS.WHITE }}
      >
        <div className="container mx-auto px-4 text-center">
          <p style={{ color: COLORS.LIGHT_GRAY }}>
            © 2024 Nozah. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Shop;

