import { getBorrowAdminType } from "../types/borrow";
import axiosWithConfig from "./axiosWithConfig";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface TokenPayload {
  user_id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
// Fungsi untuk meminjam buku
export const getBooks = async (): Promise<{ payload: { datas: any[] } }> => {
  try {
    const response = await axiosWithConfig.get("/books");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

// Fungsi untuk meminjam buku
export const Borrow = async (bookIds: number[], borrowDate: string, token: string | null): Promise<any> => {
  try {
    const formattedDate = moment(borrowDate).toISOString();
    const response = await axiosWithConfig.post("/borrows", {
      bookId: bookIds,
      borrow_date: formattedDate,
      token: token,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

// Fungsi untuk mengambil data peminjaman buku
export const getBorrow = async (): Promise<any> => {
  try {
    const response = await axiosWithConfig.get("/borrows");
    // Pastikan struktur data sesuai dengan yang diharapkan
    if (!response.data.payload || !response.data.payload.datas) {
      throw new Error("Unexpected response structure");
    }
    const books = response.data.payload.datas.map((borrow: any) => ({
      id: borrow.book.id,
      title: borrow.book.title,
      cover_image: borrow.book.cover_image,
      borrow_date: borrow.borrow_date,
    }));
    return books;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const fetchBorrowBooks = async (): Promise<getBorrowAdminType[]> => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    // Decode token to get the role
    const decodedToken = jwtDecode<TokenPayload>(token);
    const isAdmin = decodedToken.role === "admin";

    // Fetch data based on the role
    const response = await axiosWithConfig.get(isAdmin ? "/borrows" : "/borrows/user");
    console.log(response.data);
    if (!response.data.payload || !response.data.payload.datas) {
      throw new Error("Unexpected response structure");
    }

    const books = response.data.payload.datas.map((borrow: any) => ({
      id: borrow.id,
      title: borrow.book.title,
      author: borrow.book.author ? borrow.book.author : "Unknown", // Handling missing author
      borrow_date: borrow.borrow_date,
      available: borrow.return_date === null,
      user_id: borrow.user.id,
      full_name: borrow.user.full_name,
    }));

    return books;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const deleteBook = async (id_borrow: number): Promise<any> => {
  try {
    const response = await axiosWithConfig.delete(`/borrows/${id_borrow}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const editBook = async (id_borrow: number, return_date: string): Promise<any> => {
  try {
    const formattedDate = moment(return_date).toISOString();
    const response = await axiosWithConfig.patch(`/borrows/${id_borrow}`, {
      return_date: formattedDate,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const deleteBookAdmin = async (id_borrow: number): Promise<any> => {
  try {
    const response = await axiosWithConfig.delete(`/borrows/${id_borrow}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};
