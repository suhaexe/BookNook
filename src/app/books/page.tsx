"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
};

const AllBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAE9E5]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A] animate-pulse">
          Loading the shelves...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#EAE9E5] px-6 py-24 md:px-12">
       <PageTitle title="All Books" />
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#8D7771]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
              The Library
            </p>
            <span className="h-px w-10 bg-[#8D7771]" />
          </div>
          <h1 className={`${display.className} text-5xl font-medium leading-tight text-[#1a1512] md:text-7xl`}>
            All Books<span className="text-[#8D7771]">.</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-[#59636A]">
            Every book currently on the shelf, ready to be borrowed.
          </p>
        </div>

        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className={`${display.className} text-2xl italic text-[#59636A] mb-6`}>
              The shelves are empty.
            </p>
            <Link
              href="/add-book"
              className="rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
            >
              Add the first book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
            {books.map((book) => (
              <Link
                href={`/books/${book._id}`}
                key={book._id}
                className="group flex flex-col"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm bg-[#1a1512] shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-5 flex flex-col text-center">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8D7771] md:text-[10px]">
                    {book.category}
                  </p>
                  <h3 className={`${display.className} text-xl font-medium leading-tight text-[#1a1512] transition-colors group-hover:text-[#8D7771] md:text-2xl line-clamp-2`}>
                    {book.title}
                  </h3>
                  <p className={`${display.className} mt-2 text-sm italic text-[#59636A] md:text-base`}>
                    By {book.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooksPage;