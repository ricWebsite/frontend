"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authApi, unwrapSingle, type User } from "@/lib/api";

export default function StaffLoginPage() {
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
      const response = await authApi.loginStaff({ email, password });
      const user = unwrapSingle<User>(response) ?? response.data;
      const returnTo = searchParams.get("returnTo");

      if (returnTo) {
        router.push(returnTo);
      } else if (user?.role === "admin" || user?.role === "superadmin") {
        router.push("/admin/dashboard");
      } else {
        setError("This account is not staff.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Staff login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-2">Staff Login</h1>
        <p className="text-sm text-gray-600 mb-6">Admin and superadmin accounts only.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Staff email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In as Staff"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Need to bootstrap staff?{" "}
          <Link href="/admin/register" className="text-black underline">
            Staff Register
          </Link>
        </p>
      </div>
    </div>
  );
}
