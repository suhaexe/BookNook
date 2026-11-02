import Link from "next/link";
import { display } from "@/lib/fonts";

const Quote = () => {
  return (
     <section className="bg-[#EAE9E5] px-4 py-8 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#1a1512] px-8 py-20 text-center md:rounded-br-[6rem] md:rounded-tl-[6rem] md:py-32">
          {/* Giant faint quotation mark */}
          <span
            className={`${display.className} pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[320px] leading-none text-[#8D7771]/15 md:text-[480px]`}
          >
            “
          </span>

          <div className="relative">
            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#8D7771]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#B4B0A8]">
                Chapter Three
              </p>
              <span className="h-px w-10 bg-[#8D7771]" />
            </div>

            <blockquote
              className={`${display.className} mx-auto max-w-4xl text-4xl font-medium italic leading-[1.1] text-[#F1EDE6] md:text-7xl`}
            >
              A room without books is like a body without a{" "}
              <span className="text-[#A8908A]">soul</span>.
            </blockquote>

            <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-[#B4B0A8]">
              — Cicero
            </p>

            <Link
              href="/books"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#EAE9E5] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1a1512] transition hover:bg-white"
            >
              Explore the shelf <span aria-hidden>{"\u2197\uFE0E"}</span>
            </Link>
          </div>
        </div>
      </section>
  )
};

export default Quote;