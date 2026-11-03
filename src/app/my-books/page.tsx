"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageTitle } from "@/components/ui/page-title";
import { toast } from "react-toastify";
import { Cormorant_Garamond } from "next/font/google";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

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
  availableCopies?: number;
  addedBy?: {
    name: string;
    email: string;
  };
};

const borrowedCount = (book: Book) =>
  book.totalCopies - (book.availableCopies ?? book.totalCopies);

const plank =
  "-mx-3 h-3 bg-[#1a1512] shadow-[0_10px_16px_-8px_rgba(26,21,18,0.45)]";

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

  const deleteBook = books.find((b) => b._id === deleteId);
  const blockedCopies = deleteBook ? borrowedCount(deleteBook) : 0;

  const handleDelete = async () => {
    if (!deleteId || blockedCopies > 0) return;
    setIsDeleting(true);

    try {
      await apiFetch(`/books/${deleteId}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b._id !== deleteId));
      setDeleteId(null);
      toast.success("Book deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete book.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending || loading) {
    return <Spinner />;
  }

  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const onLoan = books.reduce((sum, b) => sum + borrowedCount(b), 0);

  const renderActions = (book: Book) => (
    <>
      <Link
        href={`/my-books/edit/${book._id}`}
        className="flex-1 border border-[#B4B0A8] bg-[#F5F3EF] py-2 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-[#59636A] transition-colors hover:border-[#1a1512] hover:bg-[#1a1512] hover:text-[#EAE9E5]"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={() => setDeleteId(book._id)}
        className="flex-1 border border-[#8D7771] bg-[#F5F3EF] py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8D7771] transition-colors hover:bg-[#8D7771] hover:text-[#EAE9E5]"
      >
        Delete
      </button>
    </>
  );

  return (
    <section className="min-h-screen bg-[#EAE9E5] px-6 py-24 md:px-12">
      <PageTitle title="My Books" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center">
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

        {books.length > 0 && (
          <div className="mx-auto mb-16 grid max-w-2xl grid-cols-3 border-y border-[#B4B0A8] py-6 text-center">
            {[
              { label: "Books added", value: books.length },
              { label: "Total copies", value: totalCopies },
              { label: "On loan now", value: onLoan },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={i > 0 ? "border-l border-[#B4B0A8]" : ""}
              >
                <p
                  className={`${display.className} text-4xl text-[#1a1512] lining-nums md:text-5xl`}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#8D7771]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {!error && books.length === 0 && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-full max-w-[220px]">
              <Link
                href="/add-book"
                className="flex aspect-[2/3] flex-col items-center justify-center gap-3 border-2 border-dashed border-[#8D7771]/60 text-[#8D7771] transition-colors hover:border-[#8D7771] hover:bg-[#8D7771]/10"
              >
                <span className={`${display.className} text-6xl leading-none`}>
                  +
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                  Add your first book
                </span>
              </Link>
              <div className={plank} />
            </div>
            <p
              className={`${display.className} mt-10 text-2xl italic text-[#59636A]`}
            >
              You haven&apos;t added any books yet.
            </p>
          </div>
        )}

        {books.length > 0 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => {
              const available = book.availableCopies ?? book.totalCopies;

              return (
                <div key={book._id} className="group">
                  <div className="relative aspect-[2/3] overflow-hidden bg-[#1a1512] shadow-xl">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 hidden translate-y-full gap-2 bg-gradient-to-t from-[#1a1512]/90 to-transparent p-3 pt-10 transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 md:flex">
                      {renderActions(book)}
                    </div>
                  </div>

                  <div className={plank} />

                  <div className="mt-4 text-center">
                    <h3
                      className={`${display.className} line-clamp-2 min-h-[2.5em] text-xl font-medium leading-tight text-[#1a1512]`}
                    >
                      {book.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-[#59636A]">
                      {book.author}
                    </p>
                    <span className="mt-3 inline-block rounded-full border border-[#B4B0A8] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#59636A]">
                      {available} of {book.totalCopies} on the shelf
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2 md:hidden">
                    {renderActions(book)}
                  </div>
                </div>
              );
            })}

            <div>
              <Link
                href="/add-book"
                className="flex aspect-[2/3] flex-col items-center justify-center gap-3 border-2 border-dashed border-[#8D7771]/60 text-[#8D7771] transition-colors hover:border-[#8D7771] hover:bg-[#8D7771]/10"
              >
                <span className={`${display.className} text-6xl leading-none`}>
                  +
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                  Add another
                </span>
              </Link>
              <div className={plank} />
            </div>
          </div>
        )}
      </div>

      {deleteBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1512]/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-sm bg-[#EAE9E5] p-8 text-center shadow-2xl">
            <img
              src={deleteBook.image}
              alt={deleteBook.title}
              className="mx-auto mb-6 h-40 w-[107px] rounded-sm object-cover shadow-xl"
            />
            <h2 className={`${display.className} mb-2 text-3xl text-[#1a1512]`}>
              Remove from the shelf?
            </h2>
            <p
              className={`${display.className} mb-4 text-xl italic text-[#8D7771]`}
            >
              {deleteBook.title}
            </p>

            {blockedCopies > 0 ? (
              <p className="mb-8 border border-[#8D7771]/50 bg-[#8D7771]/10 p-3 text-sm text-[#59636A]">
                {blockedCopies} {blockedCopies === 1 ? "copy is" : "copies are"}{" "}
                borrowed right now. You can remove this book once{" "}
                {blockedCopies === 1 ? "it's" : "they're"} returned.
              </p>
            ) : (
              <p className="mb-8 text-sm text-[#59636A]">
                This action cannot be undone. It will be permanently removed
                from the library.
              </p>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 border border-[#B4B0A8] py-3 text-[11px] font-bold uppercase tracking-widest text-[#59636A] transition-colors hover:bg-[#D5CCBD]/30"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting || blockedCopies > 0}
                className="flex-1 bg-[#542C35] py-3 text-[11px] font-bold uppercase tracking-widest text-[#EAE9E5] transition-colors hover:bg-[#3E1F26] disabled:opacity-50"
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