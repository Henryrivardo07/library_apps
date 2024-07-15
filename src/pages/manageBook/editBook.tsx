// src/components/EditBook.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailBook, updateBook } from "@/utils/apis/books";
import { IBookDetail } from "@/utils/types/book";
import { TextField, Button, Paper } from "@mui/material";
import Layout from "@/components/main-layout";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<IBookDetail>({
    title: "",
    author: "",
    isbn: "",
    category: "",
    description: "",
    cover_image: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        try {
          const bookData = await getDetailBook(id);

          setBook(bookData[0]); // or however you want to handle the bookData

          setLoading(false);
        } catch (error) {
          console.error("Error fetching book:", error);

          setLoading(false);
        }
      } else {
        // handle the case where id is undefined

        console.error("No id provided");
      }
    };

    loadBook();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      try {
        await updateBook(id, book);

        navigate("/managebook");
      } catch (error) {
        console.error("Error updating book:", error);
      }
    } else {
      console.error("No id provided");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Paper className="p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" name="title" value={book.title} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Author" name="author" value={book.author} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Category" name="category" value={book.category} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="ISBN" name="isbn" value={book.isbn} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Description" name="description" value={book.description} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />
          <Button type="submit" variant="contained" color="primary">
            Update Book
          </Button>
        </form>
      </Paper>
    </Layout>
  );
};

export default EditBook;
