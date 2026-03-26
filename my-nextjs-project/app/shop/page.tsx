"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import ProductCard, { ProductData } from "@/components/molecules/ProductCard";
import Button from "@/components/atoms/Button";
import { shopApi, unwrapCollection } from "@/lib/api";
import { COLORS } from "../../shared/const";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type ProductWithOptionalId = ProductData & { _id?: string };

const Shop: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load existing cart from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await shopApi.getProducts();
        setProducts(unwrapCollection<ProductData>(response));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    void fetchProducts();
  }, []);

  // Add to cart handler
  const handleAddToCart = (product: ProductData) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const updated = existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.image,
            },
          ];

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
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
            <Link
              href="/shop/cart"
              className="relative px-4 py-2 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.BLACK,
              }}
            >
              🛒 Cart ({cartItems.length})
            </Link>

            <Link href="/home" className="inline-block">
              <Button variant="ghost" size="sm">
                ← Back Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section
        className="py-12 md:py-20 text-center"
        style={{
          background: `linear-gradient(135deg, ${COLORS.PRIMARY}40 0%, ${COLORS.ACCENT}40 100%)`,
        }}
      >
        <h1
          className="text-5xl md:text-6xl font-['Great_Vibes'] mb-4"
          style={{ color: COLORS.BLACK }}
        >
          Shop
        </h1>
        <p className="text-lg md:text-xl" style={{ color: COLORS.MEDIUM_GRAY }}>
          Exclusive art prints, merchandise, and digital products
        </p>
      </section>

      {/* Product List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg animate-pulse"
                  style={{
                    backgroundColor: COLORS.LIGHT_GRAY,
                    height: "400px",
                  }}
                />
              ))}
            </div>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={(product as ProductWithOptionalId)._id || product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={(id) => router.push(`/shop/${id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
