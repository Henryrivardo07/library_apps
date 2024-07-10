import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [clickedIndex, setClickedIndex] = useState(-1); // State untuk melacak kotak mana yang sedang diklik
  const navigate = useNavigate(); // Untuk mengatur navigasi

  // Fungsi untuk menangani klik pada kotak kategori
  const handleClick = (index: number, category: string) => {
    setClickedIndex(index); // Set state dengan indeks kotak yang diklik
    // Mengatur timeout untuk menghapus efek klik setelah 500ms
    setTimeout(() => {
      setClickedIndex(-1); // Set kembali state untuk menghapus efek klik
    }, 500);

    // Navigate ke halaman yang sesuai dengan kategori yang dipilih
    navigate(`/books?category=${category}`);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <h1 className="text-4xl font-bold mb-8">CATEGORY</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div className={`bg-white rounded-lg p-14 shadow-xl hover:shadow-2xl transition duration-300 text-xl cursor-pointer transform ${clickedIndex === 0 ? "scale-95" : ""}`} onClick={() => handleClick(0, "fiction")}>
          Fiction
        </div>
        <div className={`bg-white rounded-lg p-14 shadow-xl hover:shadow-2xl transition duration-300 text-xl cursor-pointer transform ${clickedIndex === 1 ? "scale-95" : ""}`} onClick={() => handleClick(1, "romance")}>
          Romance
        </div>
        <div className={`bg-white rounded-lg p-14 shadow-xl hover:shadow-2xl transition duration-300 text-xl cursor-pointer transform ${clickedIndex === 2 ? "scale-95" : ""}`} onClick={() => handleClick(2, "fantasy")}>
          Fantasy
        </div>
        <div className={`bg-white rounded-lg p-14 shadow-xl hover:shadow-2xl transition duration-300 text-xl cursor-pointer transform ${clickedIndex === 3 ? "scale-95" : ""}`} onClick={() => handleClick(3, "mystery")}>
          Mystery
        </div>
        <div className={`bg-white rounded-lg p-14 shadow-xl hover:shadow-2xl transition duration-300 text-xl cursor-pointer transform ${clickedIndex === 4 ? "scale-95" : ""}`} onClick={() => handleClick(4, "science")}>
          Science
        </div>
        <div className={`bg-white rounded-lg p-14 shadow-xl hover:shadow-2xl transition duration-300 text-xl cursor-pointer transform ${clickedIndex === 5 ? "scale-95" : ""}`} onClick={() => handleClick(5, "history")}>
          History
        </div>
      </div>
    </div>
  );
};

export default Category;
