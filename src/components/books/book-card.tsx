import Link from "next/link";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  image: string;
  category: string;
}

const BookCard = ({ id, title, author, image, category }: BookCardProps) => {
  return (
    <Link href={`/books/${id}`} className="group block">
      <div className="relative aspect-[2/3] w-full perspective-1000">
        <div className="relative h-full w-full overflow-hidden rounded-r-md rounded-l-sm bg-[#202426] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-1 shadow-xl group-hover:shadow-2xl">
          
          <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-r from-black/40 to-transparent z-20"></div>
          
          <div className="absolute right-0 top-0 h-full w-1.5 bg-[#EAE9E5]/20 z-20"></div>

          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#373432] p-4 text-center">
              <span className="font-display text-xl text-[#B4B0A8]">{title}</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#202426]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="text-[10px] font-medium uppercase tracking-widest text-[#8D7771] mb-1">
          {category}
        </p>
        <h3 className="font-display text-lg text-[#202426] leading-tight line-clamp-1 group-hover:text-[#8D7771] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[#59636A] line-clamp-1 mt-1">
          {author}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;