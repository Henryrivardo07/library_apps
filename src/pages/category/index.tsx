import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCategoryBook } from "@/utils/apis/books";
import { IBook } from "@/utils/types/book";
import Layout from "@/components/main-layout";

const CategoryPages = () => {
  const location = useLocation();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  useEffect(() => {
    const fetchBooks = async () => {
      if (category) {
        try {
          const response = await getCategoryBook(category);
          setBooks(response.payload.datas);
          setLoading(false);
        } catch (error: any) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchBooks();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="px-4 py-8">
        <h1 className=" text-center text-4xl font-bold mb-8">Books in {category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
              <div className="w-full h-72 mb-4 rounded-lg overflow-hidden">
                <img src={book.cover_image} alt={book.title} className="max-w-48 object-cover mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-center">{book.title}</h2>
              <p className="text-gray-700 text-center">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPages;
