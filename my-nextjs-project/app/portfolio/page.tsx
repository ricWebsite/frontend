/**
 * Portfolio Page - Display categorized artwork
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PortfolioGallery, {
  PortfolioItem,
} from "@/components/organisms/PortfolioGallery";
import Button from "@/components/atoms/Button";
import { COLORS } from "../../shared/const";

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching portfolio items
    setTimeout(() => {
      setItems([
        {
          id: "1",
          title: "Geometric Tattoo",
          description: "Modern geometric design",
          image: "https://via.placeholder.com/400x400?text=Geometric+Tattoo",
          category: "tattoos",
          date: "2024-01-15",
          featured: true,
        },
        {
          id: "2",
          title: "Digital Portrait",
          description: "Vibrant digital artwork",
          image: "https://via.placeholder.com/400x400?text=Digital+Portrait",
          category: "digital",
          date: "2024-01-10",
        },
        {
          id: "3",
          title: "Ink Illustration",
          description: "Detailed pen artwork",
          image: "https://via.placeholder.com/400x400?text=Ink+Illustration",
          category: "pen",
          date: "2024-01-05",
        },
        {
          id: "4",
          title: "Abstract Tattoo",
          description: "Abstract design",
          image: "https://via.placeholder.com/400x400?text=Abstract+Tattoo",
          category: "tattoos",
          date: "2023-12-28",
        },
        {
          id: "5",
          title: "Digital Landscape",
          description: "Nature-inspired digital art",
          image: "https://via.placeholder.com/400x400?text=Digital+Landscape",
          category: "digital",
          date: "2023-12-20",
        },
        {
          id: "6",
          title: "Contemporary Art",
          description: "Modern contemporary piece",
          image: "https://via.placeholder.com/400x400?text=Contemporary+Art",
          category: "contemporary",
          date: "2023-12-15",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

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
          <Link href="/home">
            <Button variant="ghost" size="sm">
              ← Back Home
            </Button>
          </Link>
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
            Portfolio
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: COLORS.MEDIUM_GRAY }}
          >
            Explore my collection of artwork across different mediums
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PortfolioGallery items={items} loading={loading} />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: COLORS.LIGHT_GRAY }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-4xl md:text-5xl font-['Great_Vibes'] mb-6"
            style={{ color: COLORS.BLACK }}
          >
            Interested in a Custom Piece?
          </h2>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: COLORS.MEDIUM_GRAY }}
          >
            Let's collaborate to create something unique for you
          </p>
          <Link href="/bookings">
              <Button variant="primary" size="lg">
                Request a Booking
              </Button>
          </Link>
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

export default Portfolio;
