"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authApi, unwrapSingle, type User } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      const user = unwrapSingle<User>(response) ?? response.data;
      const returnTo = searchParams.get("returnTo");

      if (returnTo) {
        router.push(returnTo);
      } else if (user?.role === "admin" || user?.role === "superadmin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/home");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Login to Your Account</h2>
      <form
        onSubmit={handleLogin}
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
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>

      <p className="mt-4 text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-yellow-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
