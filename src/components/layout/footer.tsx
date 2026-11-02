import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#B4B0A8] bg-[#EAE9E5] py-12 text-center">
      <div className="mx-auto max-w-7xl px-8 flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A]">
          © 2026 BookNook. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link
            href="#"
            className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:text-[#8D7771] transition-colors"
          >
            Facebook
          </Link>
          <Link
            href="#"
            className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:text-[#8D7771] transition-colors"
          >
            Instagram
          </Link>
          <Link
            href="#"
            className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:text-[#8D7771] transition-colors"
          >
            X (Twitter)
          </Link>
        </div>
      </div>
    </footer>
  );
};
