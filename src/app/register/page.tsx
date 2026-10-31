"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as string;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    
    if (password.length < 6 || !hasUpper || !hasLower) {
      setError("Password must be at least 6 characters, with 1 uppercase and 1 lowercase.");
      setLoading(false);
      return;
    }

    const { error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
      image: image || undefined,
    });

    if (authError) {
      setError(authError.message || "Failed to register");
      setLoading(false);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-6 py-32">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8D7771] mb-4">Join Us</p>
      <h1 className="text-4xl font-display font-medium text-[#202426] mb-2">Create an account</h1>
      <p className="text-[#59636A] mb-10">To start borrowing and sharing books.</p>

      {error && <div className="mb-6 border border-[#8D7771] bg-[#8D7771]/10 p-4 text-sm text-[#202426]">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Name</label>
          <input name="name" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Email</label>
          <input name="email" type="email" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Photo URL (Optional)</label>
          <input name="image" type="url" className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Password</label>
          <input name="password" type="password" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none transition-colors" />
        </div>
        
        <button type="submit" disabled={loading} className="w-full bg-[#202426] p-4 text-[11px] font-medium uppercase tracking-widest text-[#EAE9E5] hover:bg-[#8D7771] transition-colors mt-4">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-8 text-center text-[11px] font-medium uppercase tracking-widest text-[#59636A]">
        Already have an account? <Link href="/login" className="text-[#8D7771] hover:text-[#202426] ml-1 transition-colors">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;