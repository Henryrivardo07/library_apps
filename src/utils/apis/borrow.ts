import { IBorrow } from "../types/borrow";
import axiosWithConfig from "./axiosWithConfig";
import moment from "moment";

export const Borrow = async (id: number[], borrow_date: string): Promise<IBorrow> => {
  try {
    // Format tanggal sesuai dengan format yang diharapkan oleh backend
    const formattedDate = moment(borrow_date).toISOString();
    console.log("Formatted Date:", formattedDate); // Log tanggal terformat

    const response = await axiosWithConfig.post("/borrows", {
      bookId: id,
      borrow_date: formattedDate,
    });

    console.log("Response:", response.data); // Log respons dari server

    return response.data;
  } catch (error: any) {
    console.error("Error borrowing book:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const getBorrow = async (): Promise<IBorrow[]> => {
  try {
    const response = await axiosWithConfig.get("/borrows");
    console.log("Borrow fetched successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching borrow:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};
