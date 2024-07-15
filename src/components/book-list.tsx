import { useState, useEffect } from "react";
import { IBook } from "../utils/types/book";
import { fetchBooks } from "../utils/apis/books";
import BookCard from "./book-card";
import { IPagination, IRespone } from "../utils/types/api";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState<IRespone<IPagination<IBook[]>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      const datas = await fetchBooks();
      console.log("Fetched data:", datas);
      setBooks(datas);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Error fetching books");
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!books) {
    return <div className="text-center text-gray-500 mt-4">Loading...</div>;
  }

  console.log("Books data:", books);

  if (!books.payload || !books.payload.datas) {
    return <div className="text-red-500 text-center mt-4">Error loading books</div>;
  }

  const handleOnClick = () => {
    navigate("/showall");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">List of Books</h1>
      <div className="flex">
        {books.payload.datas.slice(0, 6).map((book: IBook) => (
          <BookCard key={book.id} books={book} />
        ))}
      </div>
      <button onClick={handleOnClick} className="block mx-auto mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 roun">
        Show All
      </button>
    </div>
  );
};

export default BookList;
