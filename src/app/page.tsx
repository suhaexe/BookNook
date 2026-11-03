"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Shelf from "@/components/home/Shelf";
import Quote from "@/components/home/Quote";
import Surprise from "@/components/home/Surprise";
import About from "@/components/home/About";

type Book = {
  _id: string;
  id: string;
  title: string;
  author: string;
  cat: string;
  desc: string;
  img: string;
};

type ApiBook = {
  _id: string;
  title: string;
  author: string;
  category?: string;
  description?: string;
  image?: string;
};

function makeClues(book: Book): string[] {
  const initials = book.author
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join(". ");
  const teaser = book.desc.split(" ").slice(0, 5).join(" ");

  return [
    book.cat,
    initials ? `Written by ${initials}.` : "An unknown author",
    teaser ? `“${teaser}…”` : "A story waiting to be told",
  ];
}

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`,
        );
        if (!res.ok) throw new Error("Request failed");

        const data: ApiBook[] = await res.json();

        setBooks(
          data.map((b) => ({
            _id: b._id,
            id: b._id,
            title: b.title,
            author: b.author,
            cat: b.category || "Others",
            desc: b.description || "",
            img: b.image || "",
          })),
        );
      } catch (err) {
        console.error("Failed to fetch books", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const clues: Record<string, string[]> = Object.fromEntries(
    books.map((b) => [b.id, makeClues(b)]),
  );

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />

      {loading && (
        <section className="flex justify-center bg-[#EAE9E5] py-32">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#B4B0A8] border-t-[#8D7771]" />
        </section>
      )}

      {!loading && error && (
        <section className="bg-[#EAE9E5] px-8 py-32 text-center">
          <p className="text-[#59636A]">
            We couldn&apos;t load the shelf right now. Please refresh in a
            moment.
          </p>
        </section>
      )}

      {!loading && !error && books.length === 0 && (
        <section className="bg-[#EAE9E5] px-8 py-32 text-center">
          <p className="mb-6 text-[#59636A]">
            The shelf is empty. Be the first to add a book.
          </p>
          <Link
            href="/add-book"
            className="rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
          >
            Add a Book
          </Link>
        </section>
      )}

      {!loading && !error && books.length > 0 && <Shelf books={books} />}

      <Quote />

      {!loading && !error && books.length > 0 && (
        <Surprise books={books} clues={clues} />
      )}

      <About />
    </div>
  );
};

export default HomePage;