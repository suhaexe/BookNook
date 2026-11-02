import Link from "next/link";
import { display } from "@/lib/fonts";

const Shelf = ({ books }: { books: { id: string; title: string; author: string; cat: string; desc: string; img: string }[] }) => {
  return (
    <section className="relative border-b border-[#B4B0A8] bg-[#EAE9E5] px-8 py-16 md:py-24">
        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 flex flex-col items-center text-center md:mb-16">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#8D7771]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
                Chapter Two
              </p>
              <span className="h-px w-10 bg-[#8D7771]" />
            </div>

            <h2
              className={`${display.className} text-5xl font-medium leading-[0.95] text-[#1a1512] md:text-7xl`}
            >
              From the <span className="italic text-[#8D7771]">Shelf</span>
              <span className="text-[#8D7771]">.</span>
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-[#59636A]">
              Six books we keep coming back to.
            </p>

            <Link
              href="/books"
              className="mt-6 inline-flex items-center gap-2 border-b border-[#1a1512]/30 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1a1512] transition-colors hover:border-[#8D7771] hover:text-[#8D7771]"
            >
              View all books <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {books.map((book, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={book.id}
                  className={`flex ${isEven ? "flex-row" : "flex-row-reverse"} items-stretch w-full max-w-6xl mx-auto gap-5 md:gap-20 py-6 md:py-10`}
                >
                  {/* Image Container */}
                  <div
                    className={`w-[45%] md:w-1/2 flex items-center justify-center ${isEven ? "md:justify-end" : "md:justify-start"}`}
                  >
                    <Link
                      href={`/books/${book.id}`}
                      className="block relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[360px] aspect-[2/3] overflow-hidden bg-[#1a1512] shadow-xl md:shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                    >
                      <img
                        src={book.img}
                        alt={book.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </Link>
                  </div>

                  {/* Text Container */}
                  <div
                    className={`w-[55%] md:w-1/2 flex flex-col justify-center ${isEven ? "text-left items-start" : "text-right items-end"}`}
                  >
                    {/* Number + line + category */}
                    <div
                      className={`mb-2 md:mb-5 flex items-center gap-2 md:gap-3 ${isEven ? "" : "flex-row-reverse"}`}
                    >
                      <span
                        className={`${display.className} text-base italic text-[#8D7771] sm:text-xl md:text-3xl`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-5 bg-[#8D7771] md:w-10" />
                      <p className="text-[9px] sm:text-xs md:text-[13px] font-medium uppercase tracking-[0.25em] text-[#59636A]">
                        {book.cat}
                      </p>
                    </div>

                    <h3
                      className={`${display.className} mb-1 text-2xl font-medium leading-[1.05] text-[#1a1512] sm:text-4xl md:mb-3 md:text-[64px]`}
                    >
                      {book.title}
                    </h3>

                    <p
                      className={`${display.className} mb-2 text-sm font-medium italic text-[#59636A] sm:text-lg md:mb-5 md:text-2xl`}
                    >
                      By {book.author}
                    </p>

                    <p className="text-[10px] sm:text-xs md:text-lg text-[#59636A] leading-relaxed mb-3 md:mb-8 max-w-md line-clamp-4 md:line-clamp-none">
                      {book.desc}
                    </p>

                    <Link
                      href={`/books/${book.id}`}
                      className="inline-flex w-max items-center gap-2 border-b border-[#1a1512] pb-1 text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#1a1512] hover:text-[#8D7771] hover:border-[#8D7771] transition-colors"
                    >
                      View Details <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
  );
};

export default Shelf;