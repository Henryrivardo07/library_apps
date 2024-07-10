import { IPagination, IRespone } from "../types/api";
import { IBook, IBookDetail } from "../types/book";
import axiosWithConfig from "./axiosWithConfig";

export const fetchBooks = async (): Promise<IRespone<IPagination<IBook[]>>> => {
  try {
    const response = await axiosWithConfig.get("/books");
    console.log("Books fetched successfully:", response.data);
    return response.data; // Kembalikan seluruh response data, bukan hanya payload.datas
  } catch (error: any) {
    console.error("Error fetching books:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const getDetailBook = async (id_book: string): Promise<IBookDetail[]> => {
  try {
    const response = await axiosWithConfig.get(`/books/${id_book}`);
    console.log("Books fetched successfully:", response.data);
    return response.data.payload; // Kembalikan seluruh response data, bukan hanya payload.datas
  } catch (error: any) {
    console.error("Error fetching books:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const getNewBook = async (): Promise<IRespone<IPagination<IBook[]>>> => {
  try {
    const response = await axiosWithConfig.get("/books/?sort=New");
    console.log("Books fetched successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching books:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const getCategoryBook = async (category: string): Promise<IRespone<IPagination<IBook[]>>> => {
  try {
    const response = await axiosWithConfig.get(`/books?category=${category}`);
    console.log("Books fetched successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching books:", error.response?.data || error.message);
    throw new Error("Error fetching books: " + error.message);
  }
};

export const searchBook = async (query: string): Promise<IRespone<IPagination<IBook[]>>> => {
  try {
    const response = await axiosWithConfig.get(`/books?query=${query}`);
    console.log("Pencarian buku:", response.data.payload.datas);
    return response.data.payload.datas;
  } catch (error: any) {
    console.error("Error fetching books:", error.response?.data || error.message);
    throw new Error("Error fetching books: " + error.message);
  }
};
