import { display } from "@/lib/fonts";
import BooksStack from "./BooksStack";

const SurpriseSection = ({
  books,
  clues,
}: {
  books: {
    id: string;
    title: string;
    author: string;
    cat: string;
    desc: string;
    img: string;
  }[];
  clues: Record<string, string[]>;
}) => {
  return (
    <section className="bg-[#EAE9E5] px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-14 flex flex-col items-center text-center md:mb-20">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#8D7771]" />
            <span className="text-[#8D7771] text-[10px]">✦</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
              Chapter Four
            </p>
            <span className="text-[#8D7771] text-[10px]">✦</span>
            <span className="h-px w-8 bg-[#8D7771]" />
          </div>

          <h2
            className={`${display.className} text-5xl font-medium leading-[0.95] text-[#1a1512] md:text-7xl`}
          >
            Blind date with a{" "}
            <span className="italic text-[#8D7771]">book</span>
            <span className="text-[#8D7771]">.</span>
          </h2>

          <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#59636A]">
            Pick a parcel, read the three clues, and unwrap it to see who
            you&apos;re meeting.
          </p>
        </div>

        <BooksStack books={books} clues={clues} />
      </div>
    </section>
  );
};

export default SurpriseSection;
