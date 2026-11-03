"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageTitle } from "@/components/ui/page-title";
import { toast } from "react-toastify";
import { Cormorant_Garamond } from "next/font/google";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: number;
  addedBy: {
    name: string;
    email: string;
  };
};

const dummyBooks = [
  {
    _id: "1",
    title: "The Book of Disquiet",
    author: "Fernando Pessoa",
    category: "Fiction",
    description:
      "A masterpiece of literary modernism, this is the autobiography of a man who never existed, exploring the nature of identity, memory, and the beauty of melancholy.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX5hdbH09xjR2dfy9doD1IDjIEN36XG2VrEHwDTa_88w&s=10",
    totalCopies: 5,
    addedBy: { name: "BookNook Staff", email: "staff@booknook.com" },
  },
  {
    _id: "2",
    title: "The Waves",
    author: "Virginia Woolf",
    category: "Fiction",
    description:
      "Six characters speak in soliloquies, their voices interwoven with the rhythmic waves of the sea. A radical and poetic exploration of consciousness and time.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS319KqOo_mSPB306ZQo-XekMGRf9jx-tJbsFe-h8S89Q&s=10",
    totalCopies: 3,
    addedBy: { name: "BookNook Staff", email: "staff@booknook.com" },
  },
  {
    _id: "3",
    title: "The Unbearable Lightness of Being",
    author: "Milan Kundera",
    category: "Fiction",
    description:
      "A profound meditation on love, politics, and the eternal return, set against the backdrop of the Prague Spring.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9d914UrYfZNENbLoT8n_ETmpyFz5b_l0ygqeWcqFZfA&s=10",
    totalCopies: 4,
    addedBy: { name: "BookNook Staff", email: "staff@booknook.com" },
  },
  {
    _id: "4",
    title: "Ways of Seeing",
    author: "John Berger",
    category: "Art",
    description:
      "A brilliant and revolutionary look at how we view art, media, and the world around us. A classic text that changed the way a generation thought about images.",
    image: "https://cdn2.penguin.com.au/covers/original/9780141035796.jpg",
    totalCopies: 2,
    addedBy: { name: "BookNook Staff", email: "staff@booknook.com" },
  },
  {
    _id: "5",
    title: "The Stranger",
    author: "Albert Camus",
    category: "Fiction",
    description:
      "Through the story of an ordinary man unwittingly drawn into a senseless murder, Camus explores the nakedness of man faced with the absurd.",
    image: "https://cdn2.penguin.com.au/covers/original/9780679720201.jpg",
    totalCopies: 6,
    addedBy: { name: "BookNook Staff", email: "staff@booknook.com" },
  },
  {
    _id: "6",
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    category: "Fiction",
    description:
      "A sentimental story from the diary of a dreamer, chronicling four nights and a morning in St. Petersburg, and a love that exists only in the imagination.",
    image:
      "https://cdn.apollo.ee/o/apollo/2/5/5/c/255c8ebccddac8fb6864884438493c37178e34b8_9781398868014.jpg",
    totalCopies: 1,
    addedBy: { name: "BookNook Staff", email: "staff@booknook.com" },
  },
];

const BookDetailsContent = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const id = params.id as string;
  const isDummy = ["1", "2", "3", "4", "5", "6"].includes(id);

  const [book, setBook] = useState<Book | null>(() => {
    if (isDummy) {
      return dummyBooks.find((b) => b._id === id) || null;
    }
    return null;
  });

  const [loading, setLoading] = useState(!isDummy);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [borrowError, setBorrowError] = useState("");
  const [borrowSuccess, setBorrowSuccess] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=/books/${id}`);
      return;
    }

    if (session && !isDummy) {
      const fetchBook = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
          );

          if (!res.ok) {
            setBook(null);
            return;
          }

          const data = await res.json();
          setBook(data);
        } catch (err) {
          setBook(null);
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [session, isPending, id, router, isDummy]);

  const handleBorrow = async () => {
    if (!book) return;

    if (isDummy) {
      setIsBorrowing(true);
      setTimeout(() => {
        setBorrowSuccess(true);
        setBook({ ...book, totalCopies: book.totalCopies - 1 });
        setTimeout(() => {
          setIsModalOpen(false);
          setBorrowSuccess(false);
        }, 2000);
        setIsBorrowing(false);
      }, 800);
      return;
    }

    setIsBorrowing(true);
    setBorrowError("");

    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: book._id }),
      });

      setBorrowSuccess(true);
      setBook({ ...book, totalCopies: book.totalCopies - 1 });
      toast.success("Book borrowed successfully!"); // <--- TEST SUCCESS TOAST

      setTimeout(() => {
        setIsModalOpen(false);
        setBorrowSuccess(false);
      }, 2000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to borrow book";
      toast.error(message); // <--- TEST ERROR TOAST
    } finally {
      setIsBorrowing(false);
    }
  };
  if (isPending || (loading && !isDummy)) {
    return (
     <Spinner />
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#EAE9E5]">
        <h1 className={`${display.className} text-4xl text-[#1a1512] mb-6`}>
          Book not found.
        </h1>
        <Link
          href="/books"
          className="text-[#8D7771] uppercase tracking-widest text-[11px] font-bold underline"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  const isAvailable = book.totalCopies > 0;

  return (
    <section className="min-h-screen bg-[#EAE9E5] px-6 py-20 md:px-12 lg:py-32">
      <PageTitle title={book.title} />
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[300px] md:max-w-[400px] aspect-[2/3] overflow-hidden rounded-sm bg-[#1a1512] shadow-2xl">
            <img
              src={book.image}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#8D7771]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
              {book.category}
            </p>
          </div>

          <h1
            className={`${display.className} text-5xl md:text-7xl font-medium leading-[0.95] text-[#1a1512] mb-4`}
          >
            {book.title}
          </h1>

          <p
            className={`${display.className} text-2xl italic text-[#8D7771] mb-8`}
          >
            By {book.author}
          </p>

          <p className="text-lg text-[#59636A] leading-relaxed mb-10 max-w-xl">
            {book.description}
          </p>

          <div className="border-t border-[#B4B0A8] pt-8 mb-10 flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#59636A]">
              Added by:{" "}
              <span className="text-[#1a1512] font-bold">
                {book.addedBy?.name || "Unknown"}
              </span>
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#59636A]">
              Copies Available:{" "}
              <span className="text-[#1a1512] font-bold">
                {book.totalCopies}
              </span>
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!isAvailable}
            className={`w-full md:w-max px-10 py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors rounded-sm ${
              isAvailable
                ? "bg-[#1a1512] text-[#EAE9E5] hover:bg-[#8D7771]"
                : "bg-[#D5CCBD] text-[#59636A] cursor-not-allowed"
            }`}
          >
            {isAvailable ? "Borrow This Book" : "Not Available"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1512]/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#EAE9E5] p-8 shadow-2xl rounded-sm">
            {borrowSuccess ? (
              <div className="text-center py-8">
                <h3
                  className={`${display.className} text-3xl text-[#1a1512] mb-2`}
                >
                  Success!
                </h3>
                <p className="text-[#59636A]">You have borrowed this book.</p>
              </div>
            ) : (
              <>
                <h2
                  className={`${display.className} text-3xl text-[#1a1512] mb-6 text-center`}
                >
                  Confirm Borrow
                </h2>

                {borrowError && (
                  <div className="mb-6 border border-[#8D7771] bg-[#8D7771]/10 p-3 text-sm text-[#1a1512] text-center">
                    {borrowError}
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#59636A] mb-1">
                      User Name
                    </label>
                    <input
                      value={session?.user.name || ""}
                      readOnly
                      className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#1a1512] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#59636A] mb-1">
                      User Email
                    </label>
                    <input
                      value={session?.user.email || ""}
                      readOnly
                      className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#1a1512] outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-[#B4B0A8] py-3 text-[11px] font-bold uppercase tracking-widest text-[#59636A] hover:bg-[#D5CCBD]/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBorrow}
                    disabled={isBorrowing}
                    className="flex-1 bg-[#1a1512] py-3 text-[11px] font-bold uppercase tracking-widest text-[#EAE9E5] hover:bg-[#8D7771] transition-colors disabled:opacity-50"
                  >
                    {isBorrowing ? "Confirming..." : "Confirm Borrow"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const BookDetailsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#EAE9E5] text-[#59636A]">
          Loading...
        </div>
      }
    >
      <BookDetailsContent />
    </Suspense>
  );
};

export default BookDetailsPage;
