"use client";

import Navbar from "@/components/organisms/Navbar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[#FAF9F6] via-[#FFF8E7] to-[#F0F8F0] text-gray-800">

       {/* Navbar */}
      <Navbar />

      {/* Wavy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top wave */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#FFD1DC] to-transparent opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,0 50,50 T100,50 V100 H0 Z" fill="currentColor" />
          </svg>
        </div>
        {/* Middle wave */}
        <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#C3E0A8] to-transparent opacity-30 transform rotate-2">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,60 Q30,20 60,60 T100,60 V100 H0 Z" fill="currentColor" />
          </svg>
        </div>
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-transparent via-[#E6E6FA] to-transparent opacity-20 -rotate-1">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,40 Q20,80 50,40 T100,40 V100 H0 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

     
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center h-[70vh] px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl mb-6 leading-tight font-great-vibes text-gray-900 drop-shadow-xl">
            Nozah
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-lato text-gray-700 leading-relaxed">
            Where Skin and Canvas Converge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/portfolio" 
              className="bg-white/80 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 border border-gray-200/50"
            >
              Explore
            </Link>
            <Link 
              href="/bookings" 
              className="bg-gradient-to-r from-[#FFD1DC] to-[#C3E0A8] text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* What It's About Section */}
      <section className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-great-vibes text-gray-900">
              About Nozah
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 font-lato">
              Nozah is a Kenyan visual artist specializing in tattoos, digital art, pen illustrations, and contemporary pieces that fuse cultural heritage with modern expression. Each creation tells a story—of identity, resilience, and beauty—inviting you to wear your narrative on skin or canvas.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 font-lato">
              From intricate tribal motifs reimagined in vibrant pastels to bold digital explorations, Nozah's work bridges worlds. Whether you're seeking a personal tattoo or a custom print, this space is where art meets life.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/about" 
                className="text-gray-900 underline font-semibold hover:text-[#C3E0A8] transition-colors"
              >
                Learn More
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-900 underline font-semibold hover:text-[#C3E0A8] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* Placeholder for hero image or artwork */}
            <div className="bg-gradient-to-br from-[#E6E6FA] to-[#FFD1DC] rounded-2xl p-8 h-96 flex items-center justify-center">
              <p className="text-gray-600 italic font-lato">Featured Artwork Preview</p>
              {/* Replace with <Image src="/hero-art.jpg" alt="Nozah Artwork" fill className="object-cover rounded-2xl" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Quick Highlights) */}
      <section className="relative z-10 py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-great-vibes text-center mb-12 text-gray-900">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#C3E0A8] to-[#E6E6FA] hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Custom Tattoos</h3>
              <p className="text-gray-700">Personalized designs that honor your story, crafted with precision and passion.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#FFD1DC] to-[#FFFFFF] hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Digital Prints</h3>
              <p className="text-gray-700">High-res downloads of contemporary pieces, ready to adorn your space.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#E6E6FA] to-[#C3E0A8] hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold mb-2">Merch & More</h3>
              <p className="text-gray-700">Apparel and accessories inspired by Kenyan motifs—wear the art.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8 px-4 text-center bg-gradient-to-t from-[#FAF9F6] to-transparent">
        <p className="text-gray-600 mb-4 font-lato">© 2025 Nozah Artist Portfolio. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <Link href="https://instagram.com/nozah" className="text-gray-600 hover:text-[#C3E0A8] transition-colors text-xl" aria-label="Instagram">
            📸
          </Link>
          <Link href="https://facebook.com/nozah" className="text-gray-600 hover:text-[#C3E0A8] transition-colors text-xl" aria-label="Facebook">
            📘
          </Link>
          <Link href="https://tiktok.com/@nozah" className="text-gray-600 hover:text-[#C3E0A8] transition-colors text-xl" aria-label="TikTok">
            🎵
          </Link>
          <Link href="mailto:nozah@example.com" className="text-gray-600 hover:text-[#C3E0A8] transition-colors text-xl" aria-label="Email">
            ✉️
          </Link>
        </div>
      </footer>
    </main>
  );
}