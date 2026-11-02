"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageTitle } from "@/components/ui/page-title";
import { Cormorant_Garamond } from "next/font/google";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  dueDate: string;
};

const MyBorrowsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-borrows");
      return;
    }

    if (session) {
      const loadBorrows = async () => {
        try {
          const data = await apiFetch<Borrow[]>("/borrows");
          setBorrows(data);
        } catch (err) {
          setError("Failed to load your borrowed books.");
        } finally {
          setLoading(false);
        }
      };
      loadBorrows();
    }
  }, [session, isPending, router]);

  const handleReturn = async (id: string) => {
    setReturningId(id);
    setError("");

    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE" });
      setBorrows((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError("Failed to return book. Please try again.");
    } finally {
      setReturningId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAE9E5]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A] animate-pulse">
          Loading your library...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#EAE9E5] px-4 py-24 md:px-12">
      <PageTitle title="My Borrows" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#8D7771]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
              Your Shelf
            </p>
            <span className="h-px w-10 bg-[#8D7771]" />
          </div>
          <h1
            className={`${display.className} text-5xl font-medium leading-tight text-[#1a1512] md:text-7xl`}
          >
            My Borrows<span className="text-[#8D7771]">.</span>
          </h1>
        </div>

        {error && (
          <div className="mb-8 border border-red-500 bg-red-50 p-4 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {borrows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className={`${display.className} text-2xl italic text-[#59636A] mb-6`}
            >
              You haven&apos;t borrowed any books yet.
            </p>
            <Link
              href="/books"
              className="rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
            >
              Browse the Library
            </Link>
          </div>
        ) : (
          <div className="border border-[#B4B0A8] bg-[#F5F3EF] w-full">
            <table className="w-full text-left text-sm text-[#1a1512]">
              <thead className="border-b border-[#B4B0A8] text-[10px] uppercase tracking-[0.2em] text-[#59636A]">
                <tr>
                  <th className="px-4 md:px-6 py-4 font-medium">Book</th>
                  <th className="hidden md:table-cell px-6 py-4 font-medium text-center">
                    Borrow Date
                  </th>
                  <th className="hidden md:table-cell px-6 py-4 font-medium text-center">
                    Due Date
                  </th>
                  <th className="px-4 md:px-6 py-4 font-medium text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B4B0A8]/50">
                {borrows.map((borrow) => (
                  <tr key={borrow._id} className="cursor-default">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <img
                          src={borrow.bookImage}
                          alt={borrow.bookTitle}
                          className="h-16 w-12 object-cover rounded-sm shadow-md flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <span
                            className={`${display.className} block text-base md:text-lg font-medium leading-tight truncate md:whitespace-normal`}
                          >
                            {borrow.bookTitle}
                          </span>

                          <div className="mt-1 flex flex-col gap-0.5 text-[10px] text-[#59636A] md:hidden">
                            <span>
                              Borrowed: {formatDate(borrow.borrowDate)}
                            </span>
                            <span>Due: {formatDate(borrow.dueDate)}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="hidden md:table-cell px-6 py-4 text-[#59636A] text-center">
                      {formatDate(borrow.borrowDate)}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-[#59636A] text-center">
                      {formatDate(borrow.dueDate)}
                    </td>

                    <td className="px-4 md:px-6 py-4 text-right">
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        disabled={returningId === borrow._id}
                        className="border border-[#1a1512] px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a1512] transition-colors hover:bg-[#1a1512] hover:text-[#EAE9E5] disabled:opacity-50 whitespace-nowrap"
                      >
                        {returningId === borrow._id ? "..." : "Return"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBorrowsPage;
