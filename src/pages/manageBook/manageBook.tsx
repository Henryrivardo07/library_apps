import React, { useEffect, useState } from "react";
import { fetchBooks } from "@/utils/apis/books";
import { IBook } from "@/utils/types/book";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "@/components/main-layout";
import { useDarkMode } from "@/context/DarkModeContext";
import { useNavigate } from "react-router-dom";

const ManageBook: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetchBooks();
        setBooks(response.payload.datas);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleEdit = (book: IBook) => {
    navigate(`/editbook/${book.id}`);
  };

  const handleDelete = (bookId: string) => {
    console.log("Delete book with ID:", bookId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={`p-4 ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900`}>
        <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
        <TableContainer component={Paper} className={`shadow-md ${darkMode ? "dark:bg-gray-800" : ""}`}>
          <Table>
            <TableHead>
              <TableRow className={`${darkMode ? "dark:bg-gray-700" : ""}`}>
                <TableCell className={`text-gray-800 dark:text-white`}>Title</TableCell>
                <TableCell className={`text-gray-800 dark:text-white`}>Author</TableCell>
                <TableCell className={`text-gray-800 dark:text-white`}>Category</TableCell>
                <TableCell className={`text-gray-800 dark:text-white`}>ISBN</TableCell>
                <TableCell className={`text-gray-800 dark:text-white`}>Featured</TableCell>
                <TableCell className={`text-gray-800 dark:text-white`}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id} className={`${darkMode ? "dark:bg-gray-800" : ""}`}>
                  <TableCell className={`text-gray-800 dark:text-white`}>{book.title}</TableCell>
                  <TableCell className={`text-gray-800 dark:text-white`}>{book.author}</TableCell>
                  <TableCell className={`text-gray-800 dark:text-white`}>{book.category}</TableCell>
                  <TableCell className={`text-gray-800 dark:text-white`}>{book.isbn}</TableCell>
                  <TableCell className={`text-gray-800 dark:text-white`}>{book.featured ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(book)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(book.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default ManageBook;
