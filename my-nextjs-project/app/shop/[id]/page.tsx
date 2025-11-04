"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { COLORS } from "@/shared/const";

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams(); // grabs /shop/[id]
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching product by id
    setTimeout(() => {
      const products: ProductData[] = [
        {
          id: "1",
          name: "Art Print - Geometric",
          description: "High-quality art print.",
          price: 2500,
          image: "https://i.pinimg.com/1200x/46/15/3f/46153f73e8b625f9c602303699d67e17.jpg",
          category: "Prints",
          inStock: true,
          rating: 4.5,
          reviews: 12,
        },
        {
          id: "2",
          name: "Limited Edition Poster",
          description: "Exclusive limited edition poster.",
          price: 3500,
          image: "https://via.placeholder.com/600x600?text=Poster",
          category: "Posters",
          inStock: true,
          rating: 5,
          reviews: 8,
        },
        {
          id: "3",
          name: "Digital Art Pack",
          description: "Collection of digital designs.",
          price: 1500,
          image: "https://via.placeholder.com/600x600?text=Digital+Pack",
          category: "Digital",
          inStock: true,
          rating: 4,
          reviews: 5,
        },
      ];

      const found = products.find((p) => p.id === id);
      setProduct(found || null);
      setLoading(false);
    }, 400);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-semibold mb-4">Product not found</h1>
        <Link href="/shop">
          <Button variant="ghost">← Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen py-12 px-4 md:px-8"
      style={{ backgroundColor: COLORS.WHITE }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-lg max-w-full"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1
            className="text-4xl font-['Great_Vibes'] mb-4"
            style={{ color: COLORS.BLACK }}
          >
            {product.name}
          </h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-2">
            KES {product.price.toLocaleString()}
          </p>
          <p className="text-sm mb-6 text-gray-600">
            {product.inStock ? "In Stock ✅" : "Out of Stock ❌"}
          </p>

          <div className="flex gap-4">
            <Button variant="primary">Add to Cart</Button>
            <Link href="/shop">
              <Button variant="ghost">← Back to Shop</Button>
            </Link>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              ⭐ {product.rating} / 5 ({product.reviews} reviews)
            </p>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
