/**
 * ShopCart Component - Organism component for Nozah
 * Displays shopping cart items with checkout functionality
 */
"use client";

import React from 'react';
import Button from '../atoms/Button';
import { COLORS, SHOP_CONFIG, ERROR_MESSAGES } from '../../shared/const';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShopCartProps {
  items: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  loading?: boolean;
}

const ShopCart: React.FC<ShopCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  loading = false,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * SHOP_CONFIG.TAX_RATE;
  const total = subtotal + tax;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem?.(id);
    } else {
      onUpdateQuantity?.(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div
        className="rounded-lg p-8 text-center"
        style={{
          backgroundColor: COLORS.LIGHT_GRAY,
          border: `2px dashed ${COLORS.BORDER}`,
        }}
      >
        <p
          className="text-lg font-semibold mb-4"
          style={{ color: COLORS.MEDIUM_GRAY }}
        >
          {ERROR_MESSAGES.CART_EMPTY}
        </p>
        <p style={{ color: COLORS.MEDIUM_GRAY }}>
          Start shopping to add items to your cart
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div
        className="rounded-lg overflow-hidden border"
        style={{ borderColor: COLORS.BORDER }}
      >
        <div
          className="p-4 font-semibold"
          style={{
            backgroundColor: COLORS.LIGHT_GRAY,
            color: COLORS.BLACK,
          }}
        >
          Shopping Cart ({items.length} items)
        </div>

        <div className="divide-y" style={{ borderColor: COLORS.BORDER }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 flex gap-4 items-start"
              style={{ backgroundColor: COLORS.WHITE }}
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: COLORS.BLACK }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: COLORS.MEDIUM_GRAY }}
                >
                  {SHOP_CONFIG.CURRENCY_SYMBOL} {item.price.toFixed(2)}
                </p>

                {/* Quantity Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded border font-semibold transition-colors"
                    style={{
                      borderColor: COLORS.PRIMARY,
                      color: COLORS.PRIMARY,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.PRIMARY;
                      e.currentTarget.style.color = COLORS.BLACK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = COLORS.PRIMARY;
                    }}
                  >
                    −
                  </button>

                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-12 text-center border rounded"
                    style={{
                      borderColor: COLORS.BORDER,
                      color: COLORS.BLACK,
                    }}
                    min="1"
                  />

                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded border font-semibold transition-colors"
                    style={{
                      borderColor: COLORS.PRIMARY,
                      color: COLORS.PRIMARY,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.PRIMARY;
                      e.currentTarget.style.color = COLORS.BLACK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = COLORS.PRIMARY;
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Item Total & Remove */}
              <div className="text-right">
                <p
                  className="font-semibold text-lg mb-3"
                  style={{ color: COLORS.PRIMARY }}
                >
                  {SHOP_CONFIG.CURRENCY_SYMBOL}{' '}
                  {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => onRemoveItem?.(item.id)}
                  className="text-sm font-semibold px-3 py-1 rounded transition-colors"
                  style={{
                    backgroundColor: COLORS.ERROR,
                    color: COLORS.WHITE,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div
        className="rounded-lg p-6 space-y-3"
        style={{
          backgroundColor: COLORS.LIGHT_GRAY,
          border: `2px solid ${COLORS.BORDER}`,
        }}
      >
        <div className="flex justify-between items-center">
          <span style={{ color: COLORS.BLACK }}>Subtotal:</span>
          <span
            className="font-semibold"
            style={{ color: COLORS.BLACK }}
          >
            {SHOP_CONFIG.CURRENCY_SYMBOL} {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span style={{ color: COLORS.BLACK }}>
            Tax ({(SHOP_CONFIG.TAX_RATE * 100).toFixed(0)}%):
          </span>
          <span
            className="font-semibold"
            style={{ color: COLORS.BLACK }}
          >
            {SHOP_CONFIG.CURRENCY_SYMBOL} {tax.toFixed(2)}
          </span>
        </div>

        <div
          className="border-t-2 pt-3"
          style={{ borderColor: COLORS.BORDER }}
        >
          <div className="flex justify-between items-center">
            <span
              className="text-lg font-semibold"
              style={{ color: COLORS.BLACK }}
            >
              Total:
            </span>
            <span
              className="text-2xl font-bold"
              style={{ color: COLORS.PRIMARY }}
            >
              {SHOP_CONFIG.CURRENCY_SYMBOL} {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onCheckout}
        loading={loading}
      >
        {loading ? 'Processing...' : 'Proceed to Checkout'}
      </Button>
    </div>
  );
};

export default ShopCart;

