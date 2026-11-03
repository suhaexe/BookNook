"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { display } from "@/lib/fonts";

const LIGHT_RADIUS = 200; // size of the circle of light, in px

type Point = { x: number; y: number };

const About = () => {
  const lanternRef = useRef<HTMLDivElement>(null);
  const interacting = useRef(false); // true while a mouse or finger is on the text
  const reducedMotion = useRef(false); // true if the visitor turned animations off
  const [light, setLight] = useState<Point | null>(null);

  // The light drifts back and forth on its own until someone touches the text
  useEffect(() => {
    const el = lanternRef.current;
    if (!el) return;

    // Respect people who turned animations off: no drifting for them
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reducedMotion.current = true;
      return;
    }

    let frame = 0;

    const tick = (time: number) => {
      if (!interacting.current) {
        setLight({
          x: el.offsetWidth * (0.5 + 0.42 * Math.sin(time / 2200)),
          y: el.offsetHeight * (0.5 + 0.18 * Math.sin(time / 1700)),
        });
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // A mouse or finger takes over the light
  function follow(clientX: number, clientY: number) {
    const box = lanternRef.current?.getBoundingClientRect();
    if (!box) return;
    interacting.current = true;
    setLight({ x: clientX - box.left, y: clientY - box.top });
  }

  // The mouse or finger leaves: the light goes back to drifting
  function release() {
    interacting.current = false;
    if (reducedMotion.current) setLight(null); // no drifting, so just switch it off
  }

  // While the light exists, the text is "cut out" of a gradient:
  // dark ink inside the circle, softer grey everywhere else.
  const lanternStyle = light
    ? {
        backgroundImage: `radial-gradient(circle ${LIGHT_RADIUS}px at ${light.x}px ${light.y}px, #1a1512 0%, rgba(26,21,18,0.9) 35%, rgba(89,99,106,0.45) 100%)`,
      }
    : undefined;

  return (
    <section className="bg-[#EAE9E5] px-6 py-12 sm:px-8 md:py-24">
      {/* Page frame: one border on phones, a double rule from tablet up */}
      <div className="mx-auto max-w-4xl border border-[#B4B0A8] md:p-3">
        <div className="px-5 py-10 text-center md:border md:border-[#B4B0A8]/60 md:px-16 md:py-20">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center justify-center gap-3 md:mb-10">
            <span className="h-px w-8 bg-[#8D7771]" />
            <span className="text-[10px] text-[#8D7771]">✦</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
              Epilogue
            </p>
            <span className="text-[10px] text-[#8D7771]">✦</span>
            <span className="h-px w-8 bg-[#8D7771]" />
          </div>

          {/* The statement, with the lantern */}
          <div
            ref={lanternRef}
            onMouseMove={(e) => follow(e.clientX, e.clientY)}
            onMouseLeave={release}
            onTouchStart={(e) =>
              follow(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchMove={(e) =>
              follow(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchEnd={release}
            onTouchCancel={release}
            style={lanternStyle}
            className={
              light ? "bg-clip-text text-transparent" : "text-[#1a1512]"
            }
          >
            <p
              className={`${display.className} text-3xl font-medium italic leading-[1.2] md:text-5xl`}
            >
              A quiet corner for the modern reader, where books are passed from
              hand to hand and no story sits idle on a shelf.
            </p>
          </div>

          {/* Hint, desktop only */}
          <p className="mt-5 hidden items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8D7771] md:flex">
            <span>✦</span>
            <span>Hover over the words</span>
          </p>

          {/* Main action: same pill button as the rest of the page */}
          <Link
            href="/add-book"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771] md:mt-10"
          >
            Start your shelf <span aria-hidden>{"\u2197\uFE0E"}</span>
          </Link>

          {/* Ornament divider: three stars with equal spacing, so it's centered */}
          <div className="my-10 flex items-center justify-center gap-3 text-[#8D7771] md:my-12">
            <span className="h-px w-12 bg-[#B4B0A8]" />
            <span className="text-xs">✦</span>
            <span className="text-xs">✦</span>
            <span className="text-xs">✦</span>
            <span className="h-px w-12 bg-[#B4B0A8]" />
          </div>

          {/* Colophon */}
          <p
            className={`${display.className} mx-auto max-w-xs text-sm italic leading-relaxed text-[#59636A]`}
          >
            <span className="block">Set in Cormorant Garamond.</span>
            <span className="block">
              Built with Next.js, Tailwind and MongoDB.
            </span>
            <span className="block">First edition, 2026 · Made by Suha.</span>
          </p>

          <p
            className={`${display.className} mt-6 text-2xl italic text-[#8D7771]`}
          >
            Fin.
          </p>

          {/* Page number */}
          <p className={`${display.className} mt-4 text-base text-[#8D7771]`}>
            — 218 —
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;