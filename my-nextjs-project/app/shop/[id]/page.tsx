"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { shopApi, unwrapSingle } from "@/lib/api";
import { COLORS } from "@/shared/const";

interface ProductData {
  _id?: string;
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

interface LocalCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams(); // grabs /shop/[id]
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await shopApi.getProductById(String(id));
        const resolved = unwrapSingle<ProductData>(response);
        setProduct(resolved ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const savedCart = localStorage.getItem("cart");
    const cart: LocalCartItem[] = savedCart ? JSON.parse(savedCart) : [];
    const productId = product.id || product._id;

    if (!productId) {
      return;
    }

    const existingIndex = cart.findIndex((item) => item.id === productId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-semibold mb-4">{error || "Product not found"}</h1>
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
            <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
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
