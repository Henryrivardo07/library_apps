export interface IBook {
  id: number;
  title: string;
  author: string;
  category: string;
  cover_image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  description: string;
  featured: boolean;
  isbn: string;
}

export interface IBookDetail {
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  cover_image: string;
}
