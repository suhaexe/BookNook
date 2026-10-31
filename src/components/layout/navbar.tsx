"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    setOpen(false);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    ...(user
      ? [
          { href: "/add-book", label: "Add Book" },
          { href: "/my-books", label: "My Books" },
          { href: "/my-borrows", label: "My Borrows" },
        ]
      : []),
  ];

  return (
    <header className="border-b border-[#B4B0A8] bg-[#EAE9E5]/95 backdrop-blur-sm sticky top-0 z-50 py-5 px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-display font-medium text-[#202426] tracking-tight"
        >
          BookNook
        </Link>

        <nav className="hidden gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:text-[#8D7771] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="hidden items-center gap-6 md:flex">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="user"
                    className="h-8 w-8 object-cover border border-[#B4B0A8]"
                  />
                ) : (
                  <div className="h-8 w-8 bg-[#59636A]" />
                )}
                <span className="text-xs font-medium uppercase tracking-wider text-[#202426]">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:text-[#8D7771] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden gap-4 md:flex">
              <Link
                href="/login"
                className="px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:text-[#202426] transition-colors rounded-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#8D7771] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#EAE9E5] hover:bg-[#202426] transition-colors rounded-md"
              >
                Register
              </Link>
            </div>
          )}

          <button
            className="md:hidden text-[#202426]"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-6 flex flex-col gap-6 border-t border-[#B4B0A8] pt-6 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A]"
            >
              {l.label}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-6 mt-2 pt-6 border-t border-[#B4B0A8]">
              <div className="flex items-center gap-3">
                {user.image && (
                  <img
                    src={user.image}
                    alt="user"
                    className="h-8 w-8 object-cover border border-[#B4B0A8]"
                  />
                )}
                <span className="text-xs font-medium uppercase tracking-wider text-[#202426]">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-left text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-2 pt-6 border-t border-[#B4B0A8]">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A]"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="bg-[#8D7771] px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-[#EAE9E5]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
