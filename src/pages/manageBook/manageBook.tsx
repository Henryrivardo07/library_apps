import React, { useEffect, useState } from "react";
import { fetchBooks } from "@/utils/apis/books";
import { deleteBookAdmin } from "@/utils/apis/borrow";
import { IBook } from "@/utils/types/book";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "@/components/main-layout";
import { useDarkMode } from "@/context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const ManageBook: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null); // State untuk menyimpan ID buku yang akan dihapus
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // State untuk mengontrol dialog konfirmasi
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

  const openDeleteConfirmation = (bookId: number) => {
    setSelectedBookId(bookId);
    setDialogOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setSelectedBookId(null);
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedBookId) return;

    try {
      await deleteBookAdmin(selectedBookId);

      // Hapus buku dari state setelah penghapusan berhasil
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBookId));

      // Tampilkan toast untuk notifikasi berhasil
      toast.success("Book deleted successfully.");
    } catch (error) {
      console.error("Error deleting book:", error);
      // Tampilkan toast untuk notifikasi gagal
      toast.error("Failed to delete book.");
    } finally {
      closeDeleteConfirmation(); // Tutup dialog konfirmasi setelah selesai
    }
  };

  const handleAddNewBook = () => {
    navigate("/newbook");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={`p-4 ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900`}>
        <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
        <div className="mb-4">
          <Button variant="contained" color="primary" onClick={handleAddNewBook}>
            Add New Book
          </Button>
        </div>
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
                    <IconButton onClick={() => openDeleteConfirmation(book.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Dialog Konfirmasi */}
      <Dialog open={dialogOpen} onClose={closeDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this book?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default ManageBook;
