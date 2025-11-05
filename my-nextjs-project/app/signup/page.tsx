"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add signup logic (API call, redirect)
    console.log("Signing up:", email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Create an Account</h2>
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md w-full mb-4 p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md w-full mb-4 p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded-md"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-black hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
