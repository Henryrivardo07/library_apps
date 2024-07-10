import React from "react";
import { fetchBooks } from "../../utils/apis/books";
import { useState, useEffect } from "react";
import { IBook } from "../../utils/types/book";
import { IPagination, IRespone } from "@/utils/types/api";
import BookCard from "@/components/book-card";
import { Link } from "react-router-dom";
import Layout from "@/components/main-layout";

const ShowAll = () => {
  const [books, setBooks] = useState<IRespone<IPagination<IBook[]>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
    return <div>{error}</div>;
  }

  if (!books) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Layout>
        <h1 className="text-3xl font-bold mb-4 text-center">All Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {books.payload?.datas.map((book) => (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>
                <BookCard books={book} />
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default ShowAll;
