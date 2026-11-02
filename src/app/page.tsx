"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import Shelf from "@/components/home/Shelf";
import Quote from "@/components/home/Quote";
import Surprise from "@/components/home/Surprise";
import About from "@/components/home/About";

type Book = {
  _id: string;
  id: string;
  title: string;
  author: string;
  cat: string;
  desc: string;
  img: string;
};

const clues: Record<string, string[]> = {
  "1": ["A man who never existed", "Lisbon", "Melancholy"],
  "2": ["Six voices", "The sea", "Poetic"],
  "3": ["Love & politics", "Prague", "Philosophical"],
  "4": ["Look closer", "Art & media", "Revolutionary"],
  "5": ["An ordinary man", "The absurd", "Sun-scorched"],
  "6": ["Four nights", "St. Petersburg", "A dreamer's love"],
};

// 1. Here is your beautiful hardcoded data back
const dummyBooks: Book[] = [
  {
    id: "1",
    _id: "1",
    title: "The Book of Disquiet",
    author: "Fernando Pessoa",
    cat: "Fiction",
    desc: "A masterpiece of literary modernism, this is the autobiography of a man who never existed, exploring the nature of identity, memory, and the beauty of melancholy.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX5hdbH09xjR2dfy9doD1IDjIEN36XG2VrEHwDTa_88w&s=10",
  },
  {
    id: "2",
    _id: "2",
    title: "The Waves",
    author: "Virginia Woolf",
    cat: "Fiction",
    desc: "Six characters speak in soliloquies, their voices interwoven with the rhythmic waves of the sea. A radical and poetic exploration of consciousness and time.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS319KqOo_mSPB306ZQo-XekMGRf9jx-tJbsFe-h8S89Q&s=10",
  },
  {
    id: "3",
    _id: "3",
    title: "The Unbearable Lightness of Being",
    author: "Milan Kundera",
    cat: "Fiction",
    desc: "A profound meditation on love, politics, and the eternal return, set against the backdrop of the Prague Spring.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9d914UrYfZNENbLoT8n_ETmpyFz5b_l0ygqeWcqFZfA&s=10",
  },
  {
    id: "4",
    _id: "4",
    title: "Ways of Seeing",
    author: "John Berger",
    cat: "Art",
    desc: "A brilliant and revolutionary look at how we view art, media, and the world around us. A classic text that changed the way a generation thought about images.",
    img: "https://cdn2.penguin.com.au/covers/original/9780141035796.jpg",
  },
  {
    id: "5",
    _id: "5",
    title: "The Stranger",
    author: "Albert Camus",
    cat: "Fiction",
    desc: "Through the story of an ordinary man unwittingly drawn into a senseless murder, Camus explores the nakedness of man faced with the absurd.",
    img: "https://cdn2.penguin.com.au/covers/original/9780679720201.jpg",
  },
  {
    id: "6",
    _id: "6",
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    cat: "Fiction",
    desc: "A sentimental story from the diary of a dreamer, chronicling four nights and a morning in St. Petersburg, and a love that exists only in the imagination.",
    img: "https://cdn.apollo.ee/o/apollo/2/5/5/c/255c8ebccddac8fb6864884438493c37178e34b8_9781398868014.jpg",
  },
];

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>(dummyBooks); // Start with dummy data

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
        const data = await res.json();
        
        const formattedDbBooks = data.map((b: { _id: string, title: string, author: string, category: string, description: string, image: string }) => ({
          _id: b._id,
          id: b._id, 
          title: b.title,
          author: b.author,
          cat: b.category || "Fiction", 
          desc: b.description || "",
          img: b.image || "",
        }));
        
        // 2. Combine the real database books with your dummy books so the page stays full!
        setBooks([...formattedDbBooks, ...dummyBooks]);
      } catch (err) {
        console.error("Failed to fetch books");
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />
      {/* Slice to 6 so it only shows exactly 6 books */}
      <Shelf books={books.slice(0, 6)} />
      <Quote />
      <Surprise books={books.slice(0, 6)} clues={clues} />
      <About />
    </div>
  );
};

export default HomePage;