import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IBookDetail } from "../../utils/types/book";
import { getDetailBook } from "../../utils/apis/books";
import Layout from "../../components/main-layout";
import { useDarkMode } from "@/context/DarkModeContext"; // Import useDarkMode

const DetailPages = () => {
  const { id_book } = useParams<{ id_book: string }>();
  const [book, setBook] = useState<IBookDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { darkMode } = useDarkMode(); // Gunakan useDarkMode untuk mendapatkan status dark mode

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id_book) {
          const fetchedBook: any = await getDetailBook(id_book);
          console.log("Fetched book:", fetchedBook); // Tambahkan ini untuk melihat hasil fetchedBook
          setBook(fetchedBook);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id_book]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <Layout>
      {book ? (
        <div className={`min-h-screen container mx-auto my-8 p-4 shadow-lg rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900 "}`}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0 mt-20">
              <img className="w-60 rounded-lg shadow-md" src={book.cover_image} alt={book.title} />
            </div>
            <div className="md:w-2/3 md:pl-6 mt-20">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <h2 className="text-xl mb-2">Author: {book.author}</h2>
              <h2 className="text-xl mb-2">Category: {book.category}</h2>
              <h2 className="text-xl mb-4">ISBN: {book.isbn}</h2>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-gray-500">No book found</div>
      )}
    </Layout>
  );
};

export default DetailPages;
