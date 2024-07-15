import React from "react";
import { IBook } from "../utils/types/book";
import { Link } from "react-router-dom";

interface BookCardProps {
  books: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ books }) => {
  return (
    <Link to={`/books/${books.id}`} className="flex flex-col p-4 w-48 md:w-56 lg:w-64 h-fit items-center gap-3 hover:shadow-lg">
      <figure className="overflow-hidden border-2 ">
        <img className="h-auto w-auto object-cover aspect-[3/4]" src={books.cover_image} alt={`book cover ${books.title}`} />
      </figure>
      <p className="text-sm">
        <strong>{books.title}</strong>
      </p>
      <p>{books.author}</p>
    </Link>
  );
};

export default BookCard;

//Benar sekali! Penggunaan React.FC digunakan ketika Anda ingin menetapkan tipe parameter props pada komponen fungsi React. Jika fungsi React tidak memiliki parameter props, Anda tidak perlu menggunakan React.FC. Terima kasih telah mengonfirmasi! Jika ada yang perlu Anda tanyakan atau diskusikan lagi seputar React atau hal lainnya, silakan beritahu saya.
