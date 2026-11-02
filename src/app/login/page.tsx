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
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8D7771] mb-4">
        Welcome Back
      </p>
      <h1 className="text-4xl font-display font-medium text-[#202426] mb-10">
        Log in to BookNook.
      </h1>

      {error && (
        <div className="mb-6 border border-[#8D7771] bg-[#8D7771]/10 p-4 text-sm text-[#202426]">
          {error}
        </div>
      )}

      <button
        onClick={async () => {
          await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-[#B4B0A8] bg-transparent p-4 text-[11px] font-bold uppercase tracking-widest text-[#202426] hover:bg-[#D5CCBD]/30 transition-colors mb-8"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#B4B0A8]"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
          <span className="bg-[#EAE9E5] px-4 text-[#59636A]">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#202426] p-4 text-[11px] font-medium uppercase tracking-widest text-[#EAE9E5] hover:bg-[#8D7771] transition-colors mt-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-8 text-center text-[11px] font-medium uppercase tracking-widest text-[#59636A]">
        Dont have an account?{" "}
        <Link
          href="/register"
          className="text-[#8D7771] hover:text-[#202426] ml-1 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center py-32 text-[11px] font-medium uppercase tracking-widest text-[#59636A]">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
