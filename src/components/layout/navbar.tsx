"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation"; // Imported usePathname
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current URL

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    setOpen(false);
    setDropdownOpen(false);
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
          {links.map((l) => {
            const isActive =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] font-medium uppercase tracking-[0.15em] transition-all border-b pb-1 ${
                  isActive
                    ? "text-[#1a1512] border-[#8D7771]" // Active state
                    : "text-[#59636A] border-transparent hover:text-[#8D7771]" // Inactive state
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="hidden md:flex relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 rounded-full border border-transparent px-3 py-1.5 transition-all hover:bg-[#D5CCBD]/40 hover:border-[#B4B0A8] focus:outline-none cursor-pointer"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt="user"
                    className="h-8 w-8 rounded-full object-cover border border-[#B4B0A8]"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8D7771] text-xs font-bold text-[#EAE9E5]">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-medium uppercase tracking-wider text-[#202426]">
                  {user.name}
                </span>
                <svg
                  className={`h-3 w-3 text-[#59636A] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  ></div>

                  <div className="absolute right-0 top-full mt-2 z-50 w-48 border border-[#B4B0A8] bg-[#EAE9E5] p-2 shadow-xl">
                    <div className="border-b border-[#B4B0A8]/50 px-3 py-2 mb-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#59636A]">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium text-[#202426] truncate">
                        {user.name}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-3 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:bg-[#D5CCBD]/40 hover:text-[#202426] transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:bg-[#D5CCBD]/40 hover:text-[#202426] transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden gap-4 md:flex">
              <Link
                href="/login"
                className="px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:text-[#202426] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#8D7771] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#EAE9E5] hover:bg-[#202426] transition-colors"
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
          {links.map((l) => {
            const isActive =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-[11px] font-medium uppercase tracking-[0.15em] ${
                  isActive ? "text-[#1a1512]" : "text-[#59636A]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          {user ? (
            <div className="flex flex-col gap-4 mt-2 pt-6 border-t border-[#B4B0A8]">
              <div className="flex items-center gap-3">
                {user.image && (
                  <img
                    src={user.image}
                    alt="user"
                    className="h-8 w-8 rounded-full object-cover border border-[#B4B0A8]"
                  />
                )}
                <span className="text-xs font-medium uppercase tracking-wider text-[#202426]">
                  {user.name}
                </span>
              </div>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A]"
              >
                My Profile
              </Link>
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
