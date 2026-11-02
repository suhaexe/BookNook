"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

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
};

const EditBookPage = () => {
  const router = useRouter();
  const params = useParams();
  const { data: session, isPending } = authClient.useSession();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=/my-books/edit/${params.id}`);
      return;
    }

    if (session) {
      const fetchBook = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/books/${params.id}`,
          );
          if (!res.ok) throw new Error("Book not found");
          const data = await res.json();
          setBook(data);
        } catch (err) {
          setError("Failed to load book data.");
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [session, isPending, params.id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      let newImageUrl = book?.image || "";

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.error) throw new Error(uploadData.error);
        newImageUrl = uploadData.url;
      }

      const updatedData = {
        title: formData.get("title"),
        author: formData.get("author"),
        category: formData.get("category"),
        description: formData.get("description"),
        totalCopies: Number(formData.get("totalCopies")),
        image: newImageUrl,
      };

      await apiFetch(`/books/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
      });

      router.push("/my-books");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update book";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAE9E5]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A] animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8D7771] mb-2">
            Edit Book
          </p>
          <h1 className={`${display.className} text-4xl text-[#202426]`}>
            Update Details
          </h1>
        </div>
        <Link
          href="/my-books"
          className="text-[11px] font-bold uppercase tracking-widest text-[#59636A] hover:text-[#1a1512] underline"
        >
          Cancel
        </Link>
      </div>

      {error && (
        <div className="mb-6 border border-red-500 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">
              Book Title
            </label>
            <input
              name="title"
              defaultValue={book.title}
              required
              className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">
              Author Name
            </label>
            <input
              name="author"
              defaultValue={book.author}
              required
              className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">
              Category
            </label>
            <select
              name="category"
              defaultValue={book.category}
              required
              className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none appearance-none"
            >
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Kids">Kids</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">
              Total Copies
            </label>
            <input
              name="totalCopies"
              type="number"
              min="1"
              defaultValue={book.totalCopies}
              required
              className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">
            Update Cover Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#202426] file:text-[#EAE9E5] hover:file:bg-[#8D7771]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">
            Short Description
          </label>
          <textarea
            name="description"
            defaultValue={book.description}
            required
            rows={4}
            className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#202426] p-4 text-[11px] font-medium uppercase tracking-widest text-[#EAE9E5] hover:bg-[#8D7771] transition-colors mt-4 disabled:opacity-50"
        >
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
