"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Normally, you'd validate credentials + set a cookie
    document.cookie = "auth_token=123456; path=/";
    router.push("/home");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Log In
      </button>
    </main>
  );
}
