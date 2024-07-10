import Layout from "@/components/main-layout";
import { searchBook } from "@/utils/apis/books";
import { IBook } from "@/utils/types/book";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        if (query) {
          const response = await searchBook(query);
          console.log("Pencarian buku:", response); // Debugging log
          //mengecek apakah response ada atau tidak
          if (response && response.length > 0) {
            setBooks(response);
            setError(null);
          } else {
            setBooks([]);
            setError("Hilang BUKUNYAAA");
          }
        } else {
          setBooks([]);
          setError("MANA BUKUNYAAA");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-8">Search Results for "{query}"</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={book.cover_image} alt={book.title} className="max-w-56 object-cover mx-auto" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-700">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
