"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const AddBookPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = "";

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.error) throw new Error(uploadData.error);
        imageUrl = uploadData.url;
      }

      const bookData = {
        title: formData.get("title"),
        author: formData.get("author"),
        category: formData.get("category"),
        description: formData.get("description"),
        totalCopies: Number(formData.get("totalCopies")),
        image: imageUrl,
      };

      await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify(bookData),
      });

      router.push("/books");
      
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add book";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

    if (isPending) {
    return <div className="text-center py-32 text-[#59636A]">Checking session...</div>;
  }

  if (!session) {
    return (
      <div className="text-center py-32 flex flex-col items-center gap-4">
        <p className="text-[#59636A]">You must be logged in to add a book.</p>
        <a href="/login" className="bg-[#202426] text-[#EAE9E5] px-6 py-3 uppercase tracking-widest text-[11px] font-bold">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8D7771] mb-4">Add to the Shelf</p>
      <h1 className="text-4xl font-display font-medium text-[#202426] mb-10">Add a New Book.</h1>

      {error && <div className="mb-6 border border-[#8D7771] bg-[#8D7771]/10 p-4 text-sm text-[#202426]">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Book Title</label>
            <input name="title" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Author Name</label>
            <input name="author" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Category</label>
            <select name="category" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none appearance-none">
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Kids">Kids</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Total Copies</label>
            <input name="totalCopies" type="number" min="1" defaultValue="1" required className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Book Cover Image</label>
          <input 
            type="file" 
            accept="image/*" 
            required 
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#202426] file:text-[#EAE9E5] hover:file:bg-[#8D7771]" 
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[#59636A] mb-2">Short Description</label>
          <textarea name="description" required rows={4} className="w-full border border-[#B4B0A8] bg-transparent p-3 text-[#202426] focus:border-[#8D7771] focus:outline-none resize-none" />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-[#202426] p-4 text-[11px] font-medium uppercase tracking-widest text-[#EAE9E5] hover:bg-[#8D7771] transition-colors mt-4 disabled:opacity-50"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;