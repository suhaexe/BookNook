import { display } from "@/lib/fonts";

const About = () => {
  return (
    <section className="relative overflow-hidden bg-[#EAE9E5] px-8 py-32">
      <span
        className={`${display.className} pointer-events-none absolute -right-10 top-10 select-none text-[300px] leading-none text-[#8D7771]/10 md:text-[450px]`}
      >
        05
      </span>

      <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-5 relative">
          <div className="absolute -inset-3 border border-[#8D7771]/40 translate-x-4 translate-y-4" />

          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1512]">
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop"
              alt="Inside the BookNook library"
              className="h-full w-full object-cover grayscale-[0.3] sepia-[0.2] contrast-125"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(26,21,18,0.4))]" />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#8D7771]" />
            <span className="text-[#8D7771] text-[10px]">✦</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
              Chapter Five
            </p>
          </div>

          <h2
            className={`${display.className} text-4xl md:text-6xl text-[#1a1512] leading-[1.05] mb-10`}
          >
            A quiet corner for the{" "}
            <span className="italic text-[#8D7771]">modern</span> reader.
          </h2>

          <p className="text-lg text-[#59636A] leading-relaxed mb-6">
            <span
              className={`${display.className} float-left text-7xl leading-[0.8] pr-4 pt-2 text-[#8D7771]`}
            >
              B
            </span>
            ookNook was born from a simple idea: books shouldn&apos;t sit idle
            on shelves. They should be passed from hand to hand, sparking
            conversations and building community.
          </p>

          <p className="text-lg text-[#59636A] leading-relaxed mb-10">
            We&apos;ve created an editorial space that honors the tactile joy of
            reading while making it easier than ever to share your library with
            others.
          </p>

          <div className="flex gap-12 border-t border-[#B4B0A8] pt-8">
            <div>
              <p
                className={`${display.className} text-4xl text-[#1a1512] mb-1`}
              >
                12k+
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8D7771]">
                Books Shared
              </p>
            </div>
            <div>
              <p
                className={`${display.className} text-4xl text-[#1a1512] mb-1`}
              >
                4.8k
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8D7771]">
                Active Readers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
