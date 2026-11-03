"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@/components/ui/Spinner";
import { PageTitle } from "@/components/ui/page-title";
import { Cormorant_Garamond } from "next/font/google";

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
};

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"];

const plank =
  "-mx-2 h-[9px] bg-[#1a1512] shadow-[0_10px_16px_-8px_rgba(26,21,18,0.45)]";

const AllBooksPage = () => {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid book data");
        }

        setBooks(data);
        setError("");
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch books:", err);
          setError("We couldn't load the library. Please try again.");
          setBooks([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => controller.abort();
  }, [reload]);

  const filteredBooks = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return books.filter((book) => {
      const matchesCategory =
        activeCategory === "All" || book.category === activeCategory;

      const matchesSearch =
        !searchTerm ||
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [books, search, activeCategory]);

  const handleSurpriseMe = () => {
    if (filteredBooks.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredBooks.length);
    const randomBook = filteredBooks[randomIndex];

    router.push(`/books/${randomBook._id}`);
  };

  const handleRetry = () => {
    setLoading(true);
    setError("");
    setReload((prev) => prev + 1);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="min-h-screen bg-[#EAE9E5] px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pt-24">
      <PageTitle title="All Books" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#8D7771]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8D7771] sm:text-[11px]">
              The BookNook Archive
            </p>

            <span className="h-px w-8 bg-[#8D7771]" />
          </div>

          <h1
            className={`${display.className} max-w-[340px] text-[42px] font-medium leading-[1.08] text-[#1a1512] sm:max-w-none sm:text-6xl md:text-7xl`}
          >
            Stories Worth Keeping
            <span className="text-[#8D7771]">.</span>
          </h1>

          <p className="mt-4 max-w-[330px] text-[13px] leading-6 text-[#59636A] sm:mt-5 sm:max-w-md sm:text-[15px] sm:leading-7">
            A collection of stories, ideas, and worlds waiting to be discovered.
            Find your next favorite read.
          </p>

          <div className="mt-6 flex items-center gap-3 text-[#8D7771] sm:mt-8">
            <span className="h-px w-10 bg-[#B4B0A8]" />
            <span className="text-xs">✦</span>
            <span className="h-px w-10 bg-[#B4B0A8]" />
          </div>
        </div>

        <div className="mb-10 border-y border-[#B4B0A8] py-5 sm:mb-12 sm:py-6">
          <div className="mx-auto flex w-full max-w-[42rem] items-center gap-2 sm:mx-0 sm:max-w-none sm:gap-4">
            <div className="relative min-w-0 flex-1">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8D7771] sm:left-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books..."
                aria-label="Search books by title or author"
                className="block h-11 w-full appearance-none border border-[#B4B0A8] bg-[#F1EDE6] pl-10 pr-3 text-xs text-[#1a1512] outline-none transition placeholder:text-[#8D7771] focus:border-[#8D7771] sm:h-12 sm:pl-11 sm:pr-4 sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleSurpriseMe}
              disabled={filteredBooks.length === 0}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 border border-[#1a1512] px-3 text-[9px] font-medium uppercase tracking-[0.1em] text-[#1a1512] transition-colors hover:bg-[#1a1512] hover:text-[#EAE9E5] disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:gap-3 sm:px-6 sm:text-[10px] sm:tracking-[0.18em]"
            >
              <span>✳</span>
              Surprise Me
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid w-full grid-cols-6 gap-1 sm:w-auto sm:flex sm:flex-wrap sm:items-center sm:gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`flex min-w-0 w-full items-center justify-center whitespace-nowrap rounded-full border px-0 py-2 text-[8px] font-medium uppercase tracking-[0.03em] transition-colors sm:w-auto sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.12em] ${
                      isActive
                        ? "border-[#1a1512] bg-[#1a1512] text-[#EAE9E5]"
                        : "border-[#B4B0A8] bg-transparent text-[#59636A] hover:border-[#8D7771] hover:text-[#1a1512]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <p className="shrink-0 text-[9px] uppercase tracking-[0.15em] text-[#8D7771] sm:text-[10px]">
              Showing{" "}
              <span className="font-bold text-[#1a1512]">
                {filteredBooks.length}
              </span>{" "}
              of {books.length} books
            </p>
          </div>
        </div>

        {error ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p
              className={`${display.className} text-2xl italic text-[#59636A]`}
            >
              The shelves are temporarily out of reach.
            </p>

            <p className="mt-3 text-sm text-[#8D7771]">{error}</p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 rounded-full bg-[#1a1512] px-7 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
            >
              Try Again
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <span className={`${display.className} text-6xl text-[#8D7771]`}>
              ∅
            </span>

            <h2
              className={`${display.className} mt-5 text-3xl italic text-[#1a1512]`}
            >
              The shelves are waiting.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-7 text-[#59636A]">
              There are no books in the collection just yet. Be the first to add
              a story to the library.
            </p>

            <Link
              href="/add-book"
              className="mt-7 rounded-full bg-[#1a1512] px-7 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
            >
              Add the first book
            </Link>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <span
              className={`${display.className} text-5xl italic text-[#8D7771]`}
            >
              No matches.
            </span>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#59636A]">
              We couldn&apos;t find a book matching your search. Try another
              title, author, or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 border-b border-[#8D7771] pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#1a1512] transition hover:text-[#8D7771]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between sm:mb-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#59636A]">
                Browse the collection
              </p>

              <p className="text-[10px] uppercase tracking-[0.15em] text-[#8D7771]">
                Vol. 01
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-11 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
              {filteredBooks.map((book, index) => {
                const available = book.availableCopies ?? book.totalCopies;

                const isAvailable = available > 0;

                const bookNumber = String(index + 1).padStart(2, "0");

                return (
                  <article
                    key={book._id}
                    className="group flex h-full flex-col"
                  >
                    <Link
                      href={`/books/${book._id}`}
                      aria-label={`View details for ${book.title}`}
                      className="relative block overflow-hidden rounded-sm bg-[#D8D3CA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8D7771]"
                    >
                      <div className="relative aspect-[2/3] w-full overflow-hidden">
                        <img
                          src={book.image}
                          alt={book.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />

                        <span className="absolute left-2 top-2 bg-[#EAE9E5]/95 px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[#1a1512] shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[9px]">
                          {book.category}
                        </span>

                        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-[#1a1512]/85 text-[9px] text-[#EAE9E5] sm:right-4 sm:top-4 sm:h-8 sm:w-8 sm:text-[10px]">
                          {bookNumber}
                        </span>
                      </div>
                    </Link>

                    <div className={plank} />

                    <div className="flex flex-1 flex-col items-center px-0.5 pt-4 text-center sm:px-1 sm:pt-5">
                      <h2
                        className={`${display.className} line-clamp-2 min-h-[2.8em] text-xl font-medium leading-tight text-[#1a1512] transition-colors duration-300 group-hover:text-[#8D7771] sm:text-2xl lg:text-[26px]`}
                      >
                        {book.title}
                      </h2>

                      <p
                        className={`${display.className} mt-2 min-h-[1.5rem] text-sm italic text-[#59636A] sm:text-base`}
                      >
                        By {book.author}
                      </p>

                      <div className="mt-4 flex min-h-[30px] items-center justify-center">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.08em] ${
                            isAvailable
                              ? "border-[#8D7771]/40 text-[#59636A]"
                              : "border-[#542C35]/40 text-[#542C35]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isAvailable ? "bg-[#8D7771]" : "bg-[#542C35]"
                            }`}
                          />

                          {isAvailable
                            ? `${available} of ${book.totalCopies} on shelf`
                            : "Not Available"}
                        </span>
                      </div>

                      <Link
                        href={`/books/${book._id}`}
                        className="mt-5 inline-flex items-center justify-center gap-3 rounded-full bg-[#1a1512] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.15em] text-[#EAE9E5] transition duration-300 hover:bg-[#8D7771] sm:px-7 sm:text-[10px]"
                      >
                        View Details
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AllBooksPage;
