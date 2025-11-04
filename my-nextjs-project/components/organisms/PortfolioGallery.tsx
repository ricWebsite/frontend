/**
 * PortfolioGallery Component - Organism component for Nozah
 * Displays portfolio items in a masonry grid with filtering and lightbox
 */
"use client";

import React, { useState } from 'react';
import Image from '../atoms/Image';
import { COLORS, PORTFOLIO_CATEGORIES } from '../../shared/const';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  featured?: boolean;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  loading?: boolean;
  onItemClick?: (item: PortfolioItem) => void;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items,
  loading = false,
  onItemClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  const handleItemClick = (item: PortfolioItem) => {
    setLightboxItem(item);
    onItemClick?.(item);
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className="px-6 py-2 rounded-lg font-semibold transition-all duration-300"
          style={{
            backgroundColor: !selectedCategory ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
            color: !selectedCategory ? COLORS.BLACK : COLORS.MEDIUM_GRAY,
          }}
        >
          All Works
        </button>

        {PORTFOLIO_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
            style={{
              backgroundColor:
                selectedCategory === category.id
                  ? COLORS.PRIMARY
                  : COLORS.LIGHT_GRAY,
              color:
                selectedCategory === category.id
                  ? COLORS.BLACK
                  : COLORS.MEDIUM_GRAY,
            }}
          >
            <span>{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg animate-pulse"
              style={{ backgroundColor: COLORS.LIGHT_GRAY }}
            />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-square"
              onClick={() => handleItemClick(item)}
              style={{
                backgroundColor: COLORS.LIGHT_GRAY,
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                loading="lazy"
              />

              {/* Overlay on Hover */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                }}
              >
                <h3
                  className="text-lg font-semibold text-center mb-2"
                  style={{ color: COLORS.WHITE }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-center"
                  style={{ color: COLORS.LIGHT_GRAY }}
                >
                  {item.description}
                </p>
              </div>

              {/* Featured Badge */}
              {item.featured && (
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    color: COLORS.BLACK,
                  }}
                >
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p
            className="text-lg font-semibold"
            style={{ color: COLORS.MEDIUM_GRAY }}
          >
            No portfolio items found
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:opacity-75 transition-opacity"
              style={{ zIndex: 10 }}
            >
              ×
            </button>

            <Image
              src={lightboxItem.image}
              alt={lightboxItem.title}
              objectFit="contain"
              width={800}
              height={600}
            />

            <div
              className="mt-4 p-4 rounded-lg"
              style={{
                backgroundColor: COLORS.WHITE,
              }}
            >
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: COLORS.BLACK }}
              >
                {lightboxItem.title}
              </h2>
              <p
                className="text-base mb-3"
                style={{ color: COLORS.MEDIUM_GRAY }}
              >
                {lightboxItem.description}
              </p>
              <p
                className="text-sm"
                style={{ color: COLORS.MEDIUM_GRAY }}
              >
                {new Date(lightboxItem.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;

