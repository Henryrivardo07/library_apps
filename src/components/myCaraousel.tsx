// src/components/ui/MyCaraousel.tsx
// @ts-ignore
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getNewBook } from "@/utils/apis/books";
import { IBook } from "@/utils/types/book";
import { IRespone, IPagination } from "@/utils/types/api";
import { useDarkMode } from "@/context/DarkModeContext";
import { Link } from "react-router-dom";

const MyCaraousel = () => {
  const { darkMode } = useDarkMode();
  const [newBook, setNewBook] = useState<IRespone<IPagination<IBook[]>> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getBooks = async () => {
    try {
      const datas = await getNewBook();
      console.log("Fetched data New Book:", datas); // Logging untuk memeriksa data
      setNewBook(datas);
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

  if (!newBook) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`relative w-[70%] mx-auto overflow-hidden mb-8 mt-4 shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Carousel>
        <CarouselContent className="flex transition-transform duration-300">
          {newBook.payload.datas.map((book: IBook) => (
            <CarouselItem
              key={book.id}
              className={`min-w-[200px] md:min-w-[250px] lg:min-w-[300px] h-[350px] flex items-center justify-center box-border p-4 border shadow-md m-2 ${
                darkMode ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-white border-gray-200 text-gray-900"
              }`}
            >
              <Link to={`/books/${book.id}`} className="w-full h-full flex flex-col items-center justify-between p-2">
                <img src={book.cover_image} alt={book.title} className="w-auto h-3/4 object-contain mb-2" />
                <div className="text-center">
                  <h3 className="text-lg font-bold truncate">{book.title}</h3>
                  <p className="text-sm truncate">{book.author}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md" />
        <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md" />
      </Carousel>
    </div>
  );
};

export default MyCaraousel;
