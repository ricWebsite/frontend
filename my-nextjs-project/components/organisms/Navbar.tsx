"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/shop", label: "Shop" },
    { href: "/blog", label: "Blog" },
    { href: "/reviews", label: "Reviews" },
    { href: "/bookings", label: "Bookings" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
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
    </nav>
  );
};

export default Navbar;
