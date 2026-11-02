"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { authClient } from "@/lib/auth-client";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#EAE9E5] flex items-center justify-center text-[#59636A]">
        Loading...
      </div>
    );
  }

  if (!session) {
    return null; 
  }

  const user = session.user;

  return (
    <section className="min-h-screen bg-[#EAE9E5] px-6 py-24 md:px-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md border border-[#B4B0A8] bg-[#F5F3EF] p-10 flex flex-col items-center text-center shadow-lg">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#8D7771] mb-8">
          Your Account
        </p>

        {user.image ? (
          <img
            src={user.image}
            alt="user"
            className="h-28 w-28 rounded-full object-cover border-4 border-[#EAE9E5] shadow-md mb-6"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#8D7771] text-4xl font-bold text-[#EAE9E5] shadow-md mb-6">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <h1 className={`${display.className} text-4xl text-[#202426] mb-2`}>
          {user.name}
        </h1>

        <p className="text-[#59636A] mb-8">{user.email}</p>

        <div className="w-full border-t border-[#B4B0A8] pt-8 flex flex-col gap-4">
          <button
            onClick={async () => {
              await authClient.signOut();
              router.push("/");
            }}
            className="w-full border border-[#1a1512] py-3 text-[11px] font-bold uppercase tracking-widest text-[#1a1512] hover:bg-[#1a1512] hover:text-[#EAE9E5] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
