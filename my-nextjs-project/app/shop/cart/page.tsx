'use client';

import React, { useEffect, useState } from 'react';
import ShopCart, { CartItem } from '@/components/organisms/ShopCart';
import { useRouter } from 'next/navigation';
import { COLORS } from '@/shared/const';
import Link from 'next/link';
import { shopApi } from '@/lib/api';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle quantity update
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle remove item
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle checkout action
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items to proceed.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await shopApi.createOrder({
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
      });

      setLoading(false);
      alert('✅ Checkout successful!');
      localStorage.removeItem('cart');
      setCartItems([]);
      router.push('/shop'); // Go back to shop after checkout
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Checkout failed');
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-4 md:px-10"
      style={{ backgroundColor: COLORS.LIGHT_GRAY }}
    >
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1
            className="text-3xl font-bold font-serif"
            style={{ color: COLORS.PRIMARY }}
          >
            🛍️ Your Shopping Cart
          </h1>
          <Link href="/shop" className="text-sm font-semibold hover:underline" style={{ color: COLORS.PRIMARY }}>
            ← Continue Shopping
          </Link>
        </div>

        {/* Cart Component */}
        <ShopCart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
          loading={loading}
        />
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
