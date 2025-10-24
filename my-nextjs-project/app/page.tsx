"use client";

import Navbar from "@/components/organisms/Navbar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#E6E6FA] to-[#C3E0A8] text-gray-800 font-lato">
      <Navbar />
      <section className="flex flex-col items-center justify-center h-[80vh] px-4">
        <h1 className="text-6xl md:text-7xl font-great-vibes text-center mb-6 leading-tight text-gray-900 drop-shadow-lg">
          Welcome to Nozah
        </h1>
        <p className="text-xl md:text-2xl text-center text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed font-lato">
          Discover Kenyan-inspired tattoos, digital masterpieces, and pen art that blend culture with contemporary flair. Let's create something unforgettable together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/bookings" 
            className="bg-gradient-to-r from-[#FFD1DC] to-[#C3E0A8] text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
          >
            Book a Session
          </Link>
          <Link 
            href="/portfolio" 
            className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Explore Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}