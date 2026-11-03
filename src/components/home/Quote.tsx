"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { display } from "@/lib/fonts";

const before = "A room without books is like".split(" ");
const highlighted = "body without a soul".split(" ");

const STEP = 120;
const lastWordDelay = (before.length + 1 + highlighted.length - 1) * STEP;
const highlightDelay = lastWordDelay + 500;

const Quote = () => {
  const paperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = paperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const wordStyle = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(0.4em)",
    transition: "opacity 600ms ease, transform 600ms ease",
    transitionDelay: visible ? `${i * STEP}ms` : "0ms",
  });

  const highlightStyle = {
    backgroundImage:
      "linear-gradient(rgba(141,119,113,0.35), rgba(141,119,113,0.35))",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 90%",
    backgroundSize: visible ? "100% 38%" : "0% 38%",
    transition: `background-size 900ms ease ${visible ? highlightDelay : 0}ms`,
  };

  return (
    <section className="bg-[#EAE9E5] px-2 py-6 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="relative mx-auto max-w-[1440px] text-center">

        <div className="mb-8 flex items-center justify-center gap-3 sm:mb-12">
          <span className="h-px w-6 bg-[#8D7771] sm:w-8" />
          <span className="text-[8px] text-[#8D7771] sm:text-[10px]">✦</span>

          <p className="text-[9px] uppercase tracking-[0.3em] text-[#8D7771] sm:text-[11px]">
            Chapter Three
          </p>

          <span className="text-[8px] text-[#8D7771] sm:text-[10px]">✦</span>
          <span className="h-px w-6 bg-[#8D7771] sm:w-8" />
        </div>

        <div
          ref={paperRef}
          className="relative mx-auto w-[88%] sm:w-full max-w-3xl bg-[#F1EDE6] px-4 pb-6 pt-12 shadow-[0_18px_50px_rgba(26,21,18,0.10)] sm:px-8 md:-rotate-1 md:px-16 md:pb-14 md:pt-24"
        >
          <div
            className="absolute right-0 top-0 h-6 w-6 sm:h-10 sm:w-10 md:h-14 md:w-14"
            style={{
              background:
                "linear-gradient(225deg, #EAE9E5 0%, #EAE9E5 50%, #D8D3CA 50%, #D8D3CA 100%)",
            }}
          />

          <div
            className="absolute -top-2 left-6 h-12 w-4 bg-[#8D7771] sm:-top-3 sm:left-8 sm:h-24 sm:w-7 md:left-12"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
            }}
          />

          <span
            className={`${display.className} pointer-events-none absolute right-2 top-2 select-none text-[60px] leading-none text-[#8D7771]/20 sm:right-6 sm:top-8 sm:text-[120px] md:right-20 md:top-4 md:text-[200px]`}
          >
            “
          </span>

          <blockquote
            className={`${display.className} relative text-xl font-medium italic leading-[1.2] text-[#1a1512] sm:text-3xl md:text-6xl md:leading-[1.15]`}
          >
            {before.map((word, i) => (
              <Fragment key={i}>
                <span className="inline-block" style={wordStyle(i)}>
                  {word}
                </span>{" "}
              </Fragment>
            ))}

            <br className="block sm:hidden" />

             <span className="inline-block mr-1 md:mr-3" style={wordStyle(before.length)}>
              a
            </span>

            <span className="box-decoration-clone px-1 whitespace-nowrap" style={highlightStyle}>
              {highlighted.map((word, i) => {
                const isLast = i === highlighted.length - 1;

                return (
                  <Fragment key={i}>
                    <span
                      className={`inline-block ${isLast ? "text-[#8D7771]" : ""}`}
                      style={wordStyle(before.length + 1 + i)}
                    >
                      {word}
                      {isLast ? "." : ""}
                    </span>
                    {!isLast && " "}
                  </Fragment>
                );
              })}
            </span>
          </blockquote>

          <p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-[#8D7771] sm:mt-8 sm:text-[11px]">
            — Cicero
          </p>

          <p
            className={`${display.className} mt-4 text-center text-sm text-[#8D7771] sm:mt-10 sm:text-lg`}
          >
            — 217 —
          </p>
        </div>

        <Link
          href="/books"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a1512] px-4 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771] sm:mt-12 sm:px-7 sm:py-3.5 sm:text-[11px]"
        >
          Explore the shelf
          <span aria-hidden>{"\u2197\uFE0E"}</span>
        </Link>

      </div>
    </section>
  );
};

export default Quote;