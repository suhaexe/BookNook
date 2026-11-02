import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-[#EAE9E5] px-6 text-center">
      <span className={`${display.className} text-[120px] md:text-[200px] leading-none text-[#8D7771]/20 select-none`}>
        404
      </span>

      <div className="-mt-10 md:-mt-16 relative z-10">
        <h1 className={`${display.className} text-4xl md:text-6xl font-medium text-[#1a1512] mb-4`}>
          Page not found<span className="text-[#8D7771]">.</span>
        </h1>
        <p className="text-[#59636A] max-w-md mx-auto mb-10">
          The book you are looking for has been moved, removed, or perhaps it never existed at all.
        </p>
        
        <Link
          href="/"
          className="inline-block bg-[#1a1512] text-[#EAE9E5] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#8D7771] hover:text-[#1a1512]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}