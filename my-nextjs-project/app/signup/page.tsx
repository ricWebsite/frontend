"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authApi.register({ email, password, name });
      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => router.push("/login"), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Create an Account</h2>
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md w-full mb-4 p-2"
          required
        />
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
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-2 rounded-md"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-3 text-sm text-green-600">{success}</p>}
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
