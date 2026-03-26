"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/lib/api";

export default function StaffRegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superadminToken, setSuperadminToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authApi.registerStaff(
        { name, email, password },
        superadminToken.trim() ? superadminToken.trim() : undefined
      );
      setSuccess("Staff account created. Redirecting to staff login...");
      setTimeout(() => router.push("/admin/login"), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Staff registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-2">Staff Registration</h1>
        <p className="text-sm text-gray-600 mb-6">
          First staff bootstrap can work without token. Later registrations require a superadmin Bearer token.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          />
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

          <input
            type="text"
            placeholder="Superadmin Bearer token (optional for bootstrap)"
            value={superadminToken}
            onChange={(e) => setSuperadminToken(e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create Staff Account"}
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have a staff account?{" "}
          <Link href="/admin/login" className="text-black underline">
            Staff Login
          </Link>
        </p>
      </div>
    </div>
  );
}
