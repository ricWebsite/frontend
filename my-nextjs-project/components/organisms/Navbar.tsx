"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, user, loading } = useAuth();

  const links = [
    { href: "/home", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/shop", label: "Shop" },
    { href: "/blog", label: "Blog" },
    { href: "/reviews", label: "Reviews" },
    { href: "/bookings", label: "Bookings" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative z-50">
      <div className="text-2xl font-bold text-pink-500">Nozah</div>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? "text-pink-600 font-semibold"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {loading ? (
          <span className="text-sm text-gray-500">Checking session...</span>
        ) : isAuthenticated ? (
          <>
            <span className="text-sm text-gray-600 hidden sm:inline">{user?.email}</span>
            {user?.role === "admin" || user?.role === "superadmin" ? (
              <Link href="/admin/dashboard" className="text-sm px-4 py-2 rounded-md bg-black text-white hover:opacity-90">
                Admin
              </Link>
            ) : null}
          </>
        ) : (
          <>
            <Link href="/admin/login" className="text-sm px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
              Staff Login
            </Link>
            <Link href="/login" className="text-sm px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
              Login
            </Link>
            <Link href="/signup" className="text-sm px-4 py-2 rounded-md bg-black text-white hover:opacity-90">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
