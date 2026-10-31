"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectUrl = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || "Failed to login");
      setLoading(false);
      return;
    }

    router.push(redirectUrl);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-6 py-32">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8D7771] mb-4">Welcome Back</p>
      <h1 className="text-4xl font-display font-medium text-[#202426] mb-10">Log in to BookNook.</h1>

      {error && <div className="mb-6 border border-[#8D7771] bg-[#8D7771]/10 p-4 text-sm text-[#202426]">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Email</label>
          <input name="email" type="email" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Password</label>
          <input name="password" type="password" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none transition-colors" />
        </div>
        
        <button type="submit" disabled={loading} className="w-full bg-[#202426] p-4 text-[11px] font-medium uppercase tracking-widest text-[#EAE9E5] hover:bg-[#8D7771] transition-colors mt-4">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-8 text-center text-[11px] font-medium uppercase tracking-widest text-[#59636A]">
        Dont have an account? <Link href="/register" className="text-[#8D7771] hover:text-[#202426] ml-1 transition-colors">Register</Link>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-32 text-[11px] font-medium uppercase tracking-widest text-[#59636A]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;