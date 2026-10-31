import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative min-h-[90vh] bg-[#202426] flex items-center py-24 px-8 lg:px-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale contrast-125 brightness-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2940&auto=format&fit=crop')",
          }}
        ></div>

        <div className="absolute inset-0 bg-[#202426]/60 mix-blend-multiply"></div>

        <div className="mx-auto max-w-7xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="hidden lg:flex lg:col-span-1 items-end pb-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#59636A] [writing-mode:vertical-rl] rotate-180">
              Est. 2026 — A quiet corner for the modern reader
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B4B0A8] mb-6">
              discover . read . return
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] text-[#EAE9E5] tracking-tighter">
              Stories <br />
              <span className="text-[#8D7771] italic">worth</span> <br />
              sharing.
            </h1>
            <div className="mt-12 flex gap-6">
              <Link
                href="/books"
                className="bg-[#8D7771] text-[#202426] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#EAE9E5] transition-colors"
              >
                Browse Library
              </Link>
              <Link
                href="/add-book"
                className="border border-[#59636A] text-[#EAE9E5] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[#8D7771] hover:text-[#8D7771] transition-colors"
              >
                Add a Book
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 w-[300px] aspect-[2/3] bg-[#373432] p-2 rotate-6 shadow-2xl transition-transform duration-700 hover:rotate-0 hover:scale-105">
              <div className="w-full h-full bg-[#8D7771] flex items-center justify-center border-l-8 border-black/20">
                <span className="font-display text-[#202426] text-2xl text-center px-4 italic">
                  The Secret History
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EAE9E5] py-32 px-8 relative border-b border-[#B4B0A8]">
        <div className="mx-auto max-w-7xl relative">
          <div className="flex justify-between items-end mb-24 border-b border-[#B4B0A8] pb-8">
            <h2 className="font-display text-5xl text-[#202426]">
              Curated <br /> Selection
            </h2>
            <Link
              href="/books"
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#59636A] hover:text-[#8D7771] transition-colors mb-2"
            >
              View All Books
            </Link>
          </div>

          <div className="flex flex-col gap-24 md:gap-32">
            {[
              {
                id: "1",
                title: "The Book of Disquiet",
                author: "Fernando Pessoa",
                cat: "Fiction",
                desc: "A masterpiece of literary modernism, this is the autobiography of a man who never existed, exploring the nature of identity, memory, and the beauty of melancholy.",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX5hdbH09xjR2dfy9doD1IDjIEN36XG2VrEHwDTa_88w&s=10",
              },
              {
                id: "2",
                title: "The Waves",
                author: "Virginia Woolf",
                cat: "Fiction",
                desc: "Six characters speak in soliloquies, their voices interwoven with the rhythmic waves of the sea. A radical and poetic exploration of consciousness and time.",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS319KqOo_mSPB306ZQo-XekMGRf9jx-tJbsFe-h8S89Q&s=10",
              },
              {
                id: "3",
                title: "The Unbearable Lightness of Being",
                author: "Milan Kundera",
                cat: "Fiction",
                desc: "A profound meditation on love, politics, and the eternal return, set against the backdrop of the Prague Spring.",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9d914UrYfZNENbLoT8n_ETmpyFz5b_l0ygqeWcqFZfA&s=10",
              },
              {
                id: "4",
                title: "Ways of Seeing",
                author: "John Berger",
                cat: "Art",
                desc: "A brilliant and revolutionary look at how we view art, media, and the world around us. A classic text that changed the way a generation thought about images.",
                img: "https://cdn2.penguin.com.au/covers/original/9780141035796.jpg",
              },
              {
                id: "5",
                title: "The Stranger",
                author: "Albert Camus",
                cat: "Fiction",
                desc: "Through the story of an ordinary man unwittingly drawn into a senseless murder, Camus explores the nakedness of man faced with the absurd.",
                img: "https://cdn2.penguin.com.au/covers/original/9780679720201.jpg",
              },
              {
                id: "6",
                title: "White Nights",
                author: "Fyodor Dostoevsky",
                cat: "Fiction",
                desc: "A sentimental story from the diary of a dreamer, chronicling four nights and a morning in St. Petersburg, and a love that exists only in the imagination.",
                img: "https://cdn.apollo.ee/o/apollo/2/5/5/c/255c8ebccddac8fb6864884438493c37178e34b8_9781398868014.jpg",
              },
            ].map((book, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center w-full max-w-6xl mx-auto gap-8 md:gap-20 py-16`}
                >
                  <div
                    className={`w-full md:w-1/2 flex justify-center ${isEven ? "md:justify-end" : "md:justify-start"}`}
                  >
                    <Link
                      href={`/books/${book.id}`}
                      className="block relative w-full max-w-[260px] md:max-w-[360px] aspect-[2/3] overflow-hidden bg-[#202426] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                    >
                      <img
                        src={book.img}
                        alt={book.title}
                        className="w-full h-full object-cover object-center group-hover:opacity-100 transition-opacity duration-700"
                      />
                    </Link>
                  </div>

                  <div
                    className={`w-full md:w-1/2 flex flex-col justify-center text-center ${isEven ? "md:text-left md:items-start" : "md:text-right md:items-end"}`}
                  >
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8D7771] mb-2 md:mb-4">
                      {book.cat}
                    </p>
                    <h3 className="font-display text-3xl md:text-5xl text-[#202426] leading-tight mb-2">
                      {book.title}
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-[#59636A] mb-4">
                      By {book.author}
                    </p>
                    <p className="text-sm md:text-base text-[#59636A] leading-relaxed mb-6 max-w-sm">
                      {book.desc}
                    </p>
                    <Link
                      href={`/books/${book.id}`}
                      className="inline-block border-b border-[#202426] pb-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-[#202426] hover:text-[#8D7771] hover:border-[#8D7771] transition-colors w-max"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#8D7771] py-32 px-8 text-[#EAE9E5]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 md:col-start-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#202426]/70 mb-6">
              The Reading Room
            </p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight mb-8 text-[#202426]">
              Literary discoveries.
            </h2>
            <p className="text-[#202426]/80 text-lg leading-relaxed mb-10">
              Step into our curated selection. These are the books that have
              shaped our perspectives, kept us up at night, and stayed with us
              for years.
            </p>
            <Link
              href="/books"
              className="inline-block border-b border-[#202426] pb-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#202426] hover:text-[#EAE9E5] hover:border-[#EAE9E5] transition-colors"
            >
              Explore Recommendations
            </Link>
          </div>
          <div className="md:col-span-5 md:col-start-7 flex items-center">
            <div className="aspect-square w-full bg-[#202426] p-12 flex flex-col justify-between">
              <p className="font-display text-3xl italic leading-relaxed text-[#EAE9E5]">
                A room without books is like a body without a soul.
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#B4B0A8]">
                — Cicero
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EAE9E5] py-32 px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <div className="aspect-[3/4] w-full bg-[#D5CCBD] border border-[#B4B0A8]"></div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8D7771] mb-6">
              About BookNook
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#202426] leading-tight mb-8">
              A quiet corner for the modern reader.
            </h2>
            <p className="text-lg text-[#59636A] leading-relaxed mb-6">
              BookNook was born from a simple idea: books shouldnt sit idle on
              shelves. They should be passed from hand to hand, sparking
              conversations and building community.
            </p>
            <div className="flex gap-8 border-t border-[#B4B0A8] pt-8 mt-10">
              <div>
                <p className="font-display text-3xl text-[#202426]">12k+</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#59636A] mt-1">
                  Books Shared
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-[#202426]">4.8k</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#59636A] mt-1">
                  Active Readers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
