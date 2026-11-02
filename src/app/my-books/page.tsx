"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  totalCopies: number;
  addedBy?: {
    name: string;
    email: string;
  };
};

const MyBooksPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-books");
      return;
    }

    if (session) {
      const loadMyBooks = async () => {
        try {
          const data = await apiFetch<Book[]>("/books");

          const myBooks = data.filter(
            (b) => b.addedBy?.email === session.user.email,
          );
          setBooks(myBooks);
        } catch (err) {
          setError("Failed to load your books.");
        } finally {
          setLoading(false);
        }
      };
      loadMyBooks();
    }
  }, [session, isPending, router]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      await apiFetch(`/books/${deleteId}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError("Failed to delete book.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAE9E5]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A] animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#EAE9E5] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#8D7771]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
              Author Dashboard
            </p>
            <span className="h-px w-10 bg-[#8D7771]" />
          </div>
          <h1
            className={`${display.className} text-5xl font-medium leading-tight text-[#1a1512] md:text-7xl`}
          >
            My Books<span className="text-[#8D7771]">.</span>
          </h1>
        </div>

        {error && (
          <div className="mb-8 border border-red-500 bg-red-50 p-4 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className={`${display.className} text-2xl italic text-[#59636A] mb-6`}
            >
              You haven&apos;t added any books yet.
            </p>
            <Link
              href="/add-book"
              className="rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
            >
              Add a Book
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#B4B0A8] bg-[#F5F3EF]">
            <table className="w-full text-left text-sm text-[#1a1512]">
              <thead className="border-b border-[#B4B0A8] text-[10px] uppercase tracking-[0.2em] text-[#59636A]">
                <tr>
                  <th className="px-6 py-4 font-medium">Book</th>
                  <th className="px-6 py-4 font-medium">Copies</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B4B0A8]/50">
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="transition-colors hover:bg-[#EAE9E5]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="h-16 w-12 object-cover rounded-sm shadow-md"
                        />
                        <div>
                          <span
                            className={`${display.className} block text-lg font-medium`}
                          >
                            {book.title}
                          </span>
                          <span className="text-xs text-[#59636A]">
                            {book.author}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#59636A]">
                      {book.totalCopies}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/my-books/edit/${book._id}`}
                          className="border border-[#1a1512] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a1512] transition-colors hover:bg-[#1a1512] hover:text-[#EAE9E5]"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteId(book._id)}
                          className="border border-red-700 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-red-700 transition-colors hover:bg-red-700 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1512]/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#EAE9E5] p-8 shadow-2xl rounded-sm text-center">
            <h2 className={`${display.className} text-3xl text-[#1a1512] mb-4`}>
              Delete this book?
            </h2>
            <p className="text-[#59636A] mb-8 text-sm">
              This action cannot be undone. It will be permanently removed from
              the library.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 border border-[#B4B0A8] py-3 text-[11px] font-bold uppercase tracking-widest text-[#59636A] hover:bg-[#D5CCBD]/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-700 py-3 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-red-800 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyBooksPage;
