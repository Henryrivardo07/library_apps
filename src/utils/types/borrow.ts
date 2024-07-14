import { z } from "zod";
import { IBook } from "./book";
import { IUser } from "./users";

// Definisi skema validasi menggunakan zod
export const borrowSchema = z.object({
  bookId: z
    .number({
      required_error: "Book ID is required",
    })
    .array(),
  borrow_date: z.string({
    required_error: "Borrow date is required",
  }),
});

export const borrowPayload = z.object({
  borrow_date: z.date({
    required_error: "Borrow date is required",
  }),
  due_date: z.date({
    required_error: "Due date is required",
  }),
  return_date: z.date().optional(),
});

export type BorrowSchema = z.infer<typeof borrowSchema>;
export type BorrowPayload = z.infer<typeof borrowPayload>;

// Definisi interface IBorrow dengan struktur yang sesuai
export interface IBorrow {
  id: number;
  borrow_date: Date;
  due_date: Date;
  return_date: Date | null;
  book: IBook;
  user: IUser;
}

// Definisi struktur data dengan payload datas
export interface BorrowData {
  payload: {
    datas: IBorrow[];
  };
}
export interface getBorrowAdminType {
  id: string;
  title: string;
  author: string;
  borrow_date: string;
  available: boolean;
  user_id: number;
  full_name: string;
}
