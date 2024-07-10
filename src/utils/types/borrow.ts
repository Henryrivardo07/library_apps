import { IBook } from "./book";

export interface IBorrow<T> {
  id: number;
  borrow_date: string;
  due_date: string;
  return_date: string | null;
  book: Pick<IBook, "id" | "title" | "cover_image">;
  payload: T;
}
