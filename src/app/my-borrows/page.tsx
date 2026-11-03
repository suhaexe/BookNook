"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { PageTitle } from "@/components/ui/page-title";
import { Cormorant_Garamond } from "next/font/google";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

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

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const daysUntil = (dateString: string) => {
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  return Math.round(
    (startOfDay(new Date(dateString)) - startOfDay(new Date())) / 86400000,
  );
};

const DueChip = ({ dueDate }: { dueDate: string }) => {
  const days = daysUntil(dueDate);

  let label: string;
  let style: string;

  if (days < 0) {
    const n = Math.abs(days);
    label = `Overdue by ${n} day${n === 1 ? "" : "s"}`;
    style = "bg-[#542C35] text-[#EAE9E5]";
  } else if (days === 0) {
    label = "Due today";
    style = "bg-[#8D7771] text-[#1a1512]";
  } else {
    label = days === 1 ? "Due tomorrow" : `Due in ${days} days`;
    style =
      days <= 2
        ? "bg-[#8D7771] text-[#1a1512]"
        : "border border-[#B4B0A8] text-[#59636A]";
  }

  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${style}`}
    >
      {label}
    </span>
  );
};

const Stamp = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      className={`inline-block border-2 border-[#8D7771] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8D7771] transition-all duration-300 ${
        shown ? "-rotate-6 scale-100 opacity-100" : "-rotate-12 scale-150 opacity-0"
      }`}
    >
      Returned
    </span>
  );
};

const MyBorrowsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState<string | null>(null);
  const [stampedIds, setStampedIds] = useState<string[]>([]);

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

    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE" });
      toast.success("Book returned. Thank you!");

      setStampedIds((prev) => [...prev, id]);
      setTimeout(() => {
        setBorrows((prev) => prev.filter((b) => b._id !== id));
        setStampedIds((prev) => prev.filter((s) => s !== id));
      }, 1100);
    } catch (err) {
      toast.error("Failed to return book. Please try again.");
    } finally {
      setReturningId(null);
    }
  };

  if (isPending || loading) {
    return <Spinner />;
  }

  const nextDue = [...borrows].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  )[0];
  const overdueCount = borrows.filter((b) => daysUntil(b.dueDate) < 0).length;

  const renderAction = (borrow: Borrow) =>
    stampedIds.includes(borrow._id) ? (
      <Stamp />
    ) : (
      <button
        type="button"
        onClick={() => handleReturn(borrow._id)}
        disabled={returningId === borrow._id}
        className="whitespace-nowrap border border-[#1a1512] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a1512] transition-colors hover:bg-[#1a1512] hover:text-[#EAE9E5] disabled:opacity-50"
      >
        {returningId === borrow._id ? "Returning..." : "Return Book"}
      </button>
    );

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

          {nextDue && (
            <p
              className={`${display.className} mt-5 text-xl italic text-[#59636A]`}
            >
              {borrows.length} {borrows.length === 1 ? "book" : "books"} out ·
              next due {formatDate(nextDue.dueDate)}
              {overdueCount > 0 && (
                <span className="text-[#542C35]">
                  {" "}
                  · {overdueCount} overdue
                </span>
              )}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-8 border border-red-500 bg-red-50 p-4 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {!error && borrows.length === 0 && (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="w-full max-w-md -rotate-1 border border-[#B4B0A8] bg-[#F5F3EF] p-6 text-left shadow-lg md:p-8">
              <div className="mb-5 flex items-end justify-between border-b-2 border-[#1a1512] pb-3">
                <p
                  className={`${display.className} text-2xl font-medium text-[#1a1512]`}
                >
                  BookNook
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8D7771]">
                  Library card
                </p>
              </div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-[#59636A]">
                Borrower:{" "}
                <span className="text-[#1a1512]">{session?.user.name}</span>
              </p>
              <div className="grid grid-cols-[1fr_auto] border-b border-[#B4B0A8] pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8D7771]">
                <span>Title</span>
                <span>Date due</span>
              </div>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-9 border-b border-[#B4B0A8]/70" />
              ))}
            </div>

            <p
              className={`${display.className} mb-6 mt-10 text-2xl italic text-[#59636A]`}
            >
              Your library card is empty.
            </p>
            <Link
              href="/books"
              className="rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
            >
              Browse the Library
            </Link>
          </div>
        )}

        {borrows.length > 0 && (
          <>
            <div className="hidden border border-[#B4B0A8] bg-[#F5F3EF] md:block">
              <table className="w-full text-left text-sm text-[#1a1512]">
                <thead className="border-b-2 border-[#1a1512] font-mono text-[10px] uppercase tracking-[0.2em] text-[#59636A]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Book</th>
                    <th className="px-6 py-4 text-center font-medium">
                      Borrow Date
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Return Date
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B4B0A8]">
                  {borrows.map((borrow) => (
                    <tr
                      key={borrow._id}
                      className={`transition-opacity duration-500 ${
                        stampedIds.includes(borrow._id) ? "opacity-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={borrow.bookImage}
                            alt={borrow.bookTitle}
                            className="h-16 w-12 flex-shrink-0 rounded-sm object-cover shadow-md"
                          />
                          <Link
                            href={`/books/${borrow.bookId}`}
                            className={`${display.className} text-lg font-medium leading-tight transition-colors hover:text-[#8D7771]`}
                          >
                            {borrow.bookTitle}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-xs uppercase tracking-[0.1em] text-[#59636A]">
                        {formatDate(borrow.borrowDate)}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-xs uppercase tracking-[0.1em] text-[#59636A]">
                        {formatDate(borrow.dueDate)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <DueChip dueDate={borrow.dueDate} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {renderAction(borrow)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="space-y-4 md:hidden">
              {borrows.map((borrow) => (
                <li
                  key={borrow._id}
                  className={`border border-[#B4B0A8] bg-[#F5F3EF] p-4 transition-opacity duration-500 ${
                    stampedIds.includes(borrow._id) ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={borrow.bookImage}
                      alt={borrow.bookTitle}
                      className="h-24 w-16 flex-shrink-0 rounded-sm object-cover shadow-md"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/books/${borrow.bookId}`}
                        className={`${display.className} block text-xl font-medium leading-tight`}
                      >
                        {borrow.bookTitle}
                      </Link>
                      <div className="mt-2 space-y-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#59636A]">
                        <p>Borrowed: {formatDate(borrow.borrowDate)}</p>
                        <p>Return by: {formatDate(borrow.dueDate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-dashed border-[#B4B0A8] pt-4">
                    <DueChip dueDate={borrow.dueDate} />
                    {renderAction(borrow)}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default MyBorrowsPage;