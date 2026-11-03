import Link from "next/link";
import { display } from "@/lib/fonts";

const Shelf = ({
  books,
}: {
  books: {
    id: string;
    title: string;
    author: string;
    cat: string;
    desc: string;
    img: string;
  }[];
}) => {
  return (
    <section className="relative bg-[#EAE9E5] px-4 py-16 md:py-24">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#8D7771]" />
            <span className="text-[#8D7771] text-[10px]">✦</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
              Chapter Two
            </p>
            <span className="text-[#8D7771] text-[10px]">✦</span>
            <span className="h-px w-8 bg-[#8D7771]" />
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
                className={`flex ${isEven ? "flex-row" : "flex-row-reverse"} items-center w-full max-w-6xl mx-auto gap-2 md:gap-8 py-12 md:py-20 pl-5 md:pl-12 pr-5 md:pr-12 `}
              >
                <div
                  className={`w-1/2 flex ${isEven ? "justify-end" : "justify-start"}`}
                >
                  <Link
                    href={`/books/${book.id}`}
                    className="block relative w-full max-w-[130px] sm:max-w-[200px] md:max-w-[260px] aspect-[2/3] overflow-hidden bg-[#202426] shadow-xl md:shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  >
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full h-full object-cover object-center group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </Link>
                </div>

                <div
                  className={`w-1/2 flex flex-col justify-center ${isEven ? "text-left items-start" : "text-right items-end"}`}
                >
                  <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8D7771] mb-1 md:mb-4">
                    {book.cat}
                  </p>
                  <h3 className="font-display text-lg sm:text-2xl md:text-4xl text-[#202426] leading-tight mb-1 md:mb-2">
                    {book.title}
                  </h3>
                  <p className="text-[10px] md:text-sm font-medium text-[#59636A] mb-2 md:mb-4">
                    By {book.author}
                  </p>
                  <p className="text-[10px] md:text-base text-[#59636A] leading-relaxed mb-3 md:mb-6 line-clamp-4 md:line-clamp-none">
                    {book.desc}
                  </p>
                  <Link
                    href={`/books/${book.id}`}
                    className="inline-block border-b border-[#202426] pb-1 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-[#202426] hover:text-[#8D7771] hover:border-[#8D7771] transition-colors w-max"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center w-full">
          <Link
            href="/books"
            className="rounded-full bg-[#1a1512] text-[#EAE9E5] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#8D7771] hover:text-[#1a1512]"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Shelf;
