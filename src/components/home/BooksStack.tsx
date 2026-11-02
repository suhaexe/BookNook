"use client";

import { useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

type Book = {
  id: string;
  title: string;
  author: string;
  img: string;
};

type Props = {
  books: Book[];
  clues: Record<string, string[]>;
};

const stackPositions = [
  "translateY(0px) rotate(0deg) scale(1)",
  "translateY(14px) rotate(3deg) scale(0.97)",
  "translateY(28px) rotate(-3deg) scale(0.94)",
];

const BooksStack = ({ books, clues }: Props) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const finished = index >= books.length;
  const visible = books.slice(index, index + 3);

  function drawNext() {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setFlipped(false);
      setLeaving(false);
    }, 450);
  }

  function startOver() {
    setIndex(0);
    setFlipped(false);
  }

  return (
    <div className="flex flex-col items-center">
      {finished ? (
        <div className="mb-10 flex aspect-[2/3] w-[60%] max-w-[220px] flex-col items-center justify-center border border-[#8D7771]/40 p-4 text-center md:w-[78%] md:max-w-[340px] md:p-6 lg:max-w-[380px]">
          <p
            className={`${display.className} text-3xl italic leading-tight text-[#1a1512]`}
          >
            That&apos;s every book on the pile.
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-[#8D7771]">
            Want another go?
          </p>
        </div>
      ) : (
        <div className="relative mb-10 aspect-[2/3] w-[60%] max-w-[220px] md:w-[78%] md:max-w-[340px] lg:max-w-[380px]">
          {visible.map((book, depth) => {
            const isTop = depth === 0;
            const isOpen = isTop && flipped;
            const isLeaving = isTop && leaving;

            return (
              <div
                key={book.id}
                onClick={() => isTop && !flipped && setFlipped(true)}
                className={`absolute inset-0 ${
                  isTop && !flipped ? "cursor-pointer" : ""
                }`}
                style={{
                  zIndex: 10 - depth,
                  transform: isLeaving
                    ? "translateX(120%) rotate(14deg)"
                    : stackPositions[depth],
                  opacity: isLeaving ? 0 : 1,
                  transition: "transform 450ms ease, opacity 450ms ease",
                  perspective: "1200px",
                }}
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isOpen ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 700ms ease",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-sm bg-[#1a1512] shadow-xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(141,119,113,0.35),transparent_60%)]" />
                    <div className="absolute inset-3 border border-[#8D7771]/50" />

                    <div className="relative flex h-full flex-col items-center justify-between px-6 py-9 text-center">
                      <p
                        className={`${display.className} text-lg italic text-[#A8908A]`}
                      >
                        {String(index + depth + 1).padStart(2, "0")}
                      </p>

                      <ul
                        className={`${display.className} space-y-3 text-lg italic leading-[1.1] text-[#F1EDE6] md:text-[28px]`}
                      >
                       {(clues[book.id] || ["A hidden gem", "An unknown journey", "A mystery to uncover"]).map((clue, ci) => (
                          <li key={clue}>
                            {ci > 0 && (
                              <span className="mb-3 block text-xs text-[#8D7771]">
                                ✦
                              </span>
                            )}
                            {clue}
                          </li>
                        ))}
                      </ul>

                      <span
                        className={`${display.className} flex h-12 w-12 items-center justify-center rounded-full bg-[#8D7771] text-3xl text-[#1a1512] shadow-lg`}
                      >
                        ?
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 overflow-hidden rounded-sm bg-[#1a1512] shadow-xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a1512] via-[#1a1512]/85 to-transparent px-5 pb-5 pt-16">
                      <p
                        className={`${display.className} text-2xl font-medium leading-tight text-[#F1EDE6]`}
                      >
                        {book.title}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#B4B0A8]">
                        {book.author}
                      </p>
                      <Link
                        href={`/books/${book.id}`}
                        className="mt-3 inline-flex items-center gap-1 border-b border-[#EAE9E5]/60 pb-0.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#EAE9E5]"
                      >
                        View details <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
          {finished
            ? "Pile finished"
            : `${String(index + 1).padStart(2, "0")} / ${String(books.length).padStart(2, "0")}`}
        </p>

        {finished ? (
          <button
            onClick={startOver}
            className="rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
          >
            Start over
          </button>
        ) : (
          <button
            onClick={flipped ? drawNext : () => setFlipped(true)}
            disabled={leaving}
            className="rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771] disabled:opacity-50"
          >
            {flipped ? "Draw the next one →" : "Unwrap this one"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BooksStack;
