"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi, unwrapSingle, type User } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function StaffRegisterPage() {
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"register" | "verify">("register");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authApi.registerStaff({ name, email, password });
      setStep("verify");
      setSuccess("Verification code sent to your email. Enter it below to activate staff access.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Staff registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authApi.verifyStaffEmail({ email, code });
      const user = unwrapSingle<User>(response) ?? response.data;
      await refreshAuth();

      setSuccess("Email verified successfully.");
      if (user?.role === "admin" || user?.role === "superadmin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/login");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Email verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setSuccess("");
    setResendLoading(true);

    try {
      await authApi.resendStaffVerification({ email });
      setSuccess("A new verification code has been sent to your email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend verification code");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-2">
          {step === "register" ? "Staff Registration" : "Verify Staff Email"}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {step === "register"
            ? "Create a staff account (admin role) and verify the email with the 6-digit code sent to inbox."
            : "Use the 6-digit verification code sent to your staff email (valid for 10 minutes)."}
        </p>

        {step === "register" ? (
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
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="email"
              value={email}
              className="border border-gray-300 rounded-md w-full p-2 bg-gray-100"
              readOnly
            />
            <input
              type="text"
              placeholder="6-digit verification code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-black text-white py-2 rounded-md disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendLoading}
              className="w-full border border-gray-300 py-2 rounded-md disabled:opacity-70"
            >
              {resendLoading ? "Resending..." : "Resend Code"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("register");
                setError("");
                setSuccess("");
              }}
              className="w-full border border-gray-300 py-2 rounded-md"
            >
              Back to Registration
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </form>
        )}

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
