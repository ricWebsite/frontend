/**
 * Bookings Page - Booking form and information
 */

"use client";

import React, { useState } from "react";
import Link from 'next/link';
import BookingForm from "@/components/molecules/BookingForm";
import Button from "@/components/atoms/Button";
import { COLORS } from "@/shared/const";

const Bookings: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleBookingSuccess = () => {
    setSuccessMessage("Your booking request has been submitted successfully!");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleBookingError = (error: string) => {
    console.error("Booking error:", error);
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
            Book a Session
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: COLORS.MEDIUM_GRAY }}
          >
            Let's create something amazing together
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              {successMessage && (
                <div
                  className="mb-6 p-4 rounded-lg text-sm font-semibold"
                  style={{
                    backgroundColor: COLORS.SECONDARY,
                    color: COLORS.BLACK,
                  }}
                >
                  {successMessage}
                </div>
              )}
              <BookingForm
                onSuccess={handleBookingSuccess}
                onError={handleBookingError}
              />
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* Booking Info */}
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: COLORS.LIGHT_GRAY,
                  border: `2px solid ${COLORS.BORDER}`,
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: COLORS.BLACK }}
                >
                  Booking Information
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <strong style={{ color: COLORS.BLACK }}>Duration:</strong>
                    <p style={{ color: COLORS.MEDIUM_GRAY }}>
                      Sessions typically last 1-4 hours
                    </p>
                  </li>
                  <li>
                    <strong style={{ color: COLORS.BLACK }}>
                      Advance Notice:
                    </strong>
                    <p style={{ color: COLORS.MEDIUM_GRAY }}>
                      Book at least 1 day in advance
                    </p>
                  </li>
                  <li>
                    <strong style={{ color: COLORS.BLACK }}>
                      Consultation:
                    </strong>
                    <p style={{ color: COLORS.MEDIUM_GRAY }}>
                      Free initial consultation to discuss your project
                    </p>
                  </li>
                  <li>
                    <strong style={{ color: COLORS.BLACK }}>Payment:</strong>
                    <p style={{ color: COLORS.MEDIUM_GRAY }}>
                      50% deposit required to confirm booking
                    </p>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: COLORS.LIGHT_GRAY,
                  border: `2px solid ${COLORS.BORDER}`,
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: COLORS.BLACK }}
                >
                  Services
                </h3>
                <ul className="space-y-2 text-sm">
                  <li style={{ color: COLORS.BLACK }}>
                    ✓ Tattoo Design & Application
                  </li>
                  <li style={{ color: COLORS.BLACK }}>
                    ✓ Digital Art Creation
                  </li>
                  <li style={{ color: COLORS.BLACK }}>
                    ✓ Pen Art Illustrations
                  </li>
                  <li style={{ color: COLORS.BLACK }}>✓ Custom Artwork</li>
                  <li style={{ color: COLORS.BLACK }}>✓ Art Consultation</li>
                </ul>
              </div>

              {/* Contact Info */}
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: COLORS.LIGHT_GRAY,
                  border: `2px solid ${COLORS.BORDER}`,
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: COLORS.BLACK }}
                >
                  Contact
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: COLORS.MEDIUM_GRAY }}
                >
                  Have questions? Reach out directly:
                </p>
                <a
                  href="mailto:hello@nozah.com"
                  style={{ color: COLORS.PRIMARY }}
                  className="font-semibold text-sm"
                >
                  hello@nozah.com
                </a>
              </div>
            </div>
          </div>
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

export default Bookings;
