import axiosWithConfig from "./axiosWithConfig";
import moment from "moment";

// Fungsi untuk meminjam buku
export const Borrow = async (bookIds: number[], borrowDate: string): Promise<any> => {
  try {
    const formattedDate = moment(borrowDate).toISOString();
    console.log("Formatted Date:", formattedDate);

    const response = await axiosWithConfig.post("/borrows", {
      bookId: bookIds,
      borrow_date: formattedDate,
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error borrowing book:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

// Fungsi untuk mendapatkan data peminjaman

// Fungsi untuk mengambil data peminjaman buku
export const getBorrow = async (): Promise<any> => {
  try {
    const response = await axiosWithConfig.get("/borrows");
    console.log("Borrow fetched successfully:", response.data);

    // Jika response memiliki struktur tertentu, ekstrak data yang diinginkan
    const books = response.data.payload.datas.map((borrow: any) => ({
      id: borrow.book.id,
      title: borrow.book.title,
      cover_image: borrow.book.cover_image,
      borrow_date: borrow.borrow_date,
    }));

    return books;
  } catch (error: any) {
    console.error("Error fetching borrow:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};
