/**
 * ProductCard Component - Molecular component for Nozah
 * Card component for displaying products in the shop
 */

import React, { useState } from 'react';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import { COLORS, SHOP_CONFIG } from '../../shared/const';

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: ProductData;
  onAddToCart?: (product: ProductData) => void;
  onViewDetails?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            style={{
              color: i < Math.round(rating) ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
              fontSize: '0.875rem',
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatPrice = (price: number) => {
    return `${SHOP_CONFIG.CURRENCY_SYMBOL} ${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div
      className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      style={{
        backgroundColor: COLORS.WHITE,
        border: `1px solid ${COLORS.BORDER}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="relative h-64 overflow-hidden"
        style={{ backgroundColor: COLORS.LIGHT_GRAY }}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={256}
          objectFit="cover"
          loading="lazy"
        />

        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center font-semibold text-lg"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: COLORS.WHITE,
            }}
          >
            Out of Stock
          </div>
        )}

        {isHovered && product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            <Button
              size="sm"
              variant="primary"
              onClick={() => onViewDetails?.(product.id)}
            >
              View Details
            </Button>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4">
        {product.category && (
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: COLORS.SECONDARY }}
          >
            {product.category}
          </p>
        )}

        <h3
          className="text-lg font-semibold mb-2 line-clamp-2"
          style={{ color: COLORS.BLACK }}
        >
          {product.name}
        </h3>

        <p
          className="text-sm mb-3 line-clamp-2"
          style={{ color: COLORS.MEDIUM_GRAY }}
        >
          {product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            {renderStars(product.rating)}
            {product.reviews && (
              <span
                className="text-xs"
                style={{ color: COLORS.MEDIUM_GRAY }}
              >
                ({product.reviews})
              </span>
            )}
          </div>
        )}

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span
            className="text-xl font-bold"
            style={{ color: COLORS.PRIMARY }}
          >
            {formatPrice(product.price)}
          </span>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

