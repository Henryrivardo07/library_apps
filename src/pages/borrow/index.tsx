import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/authContext";

import { Button, TextField, Typography, Box, MenuItem, Avatar } from "@mui/material";

import Layout from "../../components/main-layout";

import { Borrow, getBooks } from "../../utils/apis/borrow";

import moment from "moment";

import { useDarkMode } from "../../context/DarkModeContext";

const BookBorrowForm: React.FC = () => {
  const [bookId, setBookId] = useState<string>("");

  const [borrowDate, setBorrowDate] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  const [books, setBooks] = useState<any[]>([]); // State untuk menyimpan daftar buku

  const navigate = useNavigate();

  const { token } = useAuth();

  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Mengambil daftar buku saat komponen dimuat

    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();

      setBooks(response.payload.datas);
    } catch (error: any) {
      console.error("Error fetching books:", error.message || "Network response was not ok");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    setError(null);

    setSuccess(null);

    try {
      const formattedDate = moment(borrowDate).toISOString();

      console.log("Tanggal Peminjaman Terformat:", formattedDate);

      const response = await Borrow([parseInt(bookId)], formattedDate, token);

      console.log("Peminjaman Buku:", response);

      setSuccess("Buku berhasil dipinjam");

      navigate("/mybooks");
    } catch (error: any) {
      setError(error.message || "Gagal meminjam buku");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <Box
          sx={{
            padding: 4,

            borderRadius: 2,

            boxShadow: 3,

            backgroundColor: darkMode ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",

            color: darkMode ? "white" : "black",

            width: "100%",

            maxWidth: "400px",
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Peminjaman Buku
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              select
              margin="normal"
              required
              fullWidth
              id="bookId"
              label="Pilih Buku"
              name="bookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              InputLabelProps={{ style: { color: darkMode ? "white" : "black" } }}
              InputProps={{ style: { color: darkMode ? "white" : "black" } }}
            >
              {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} alt={book.title} src={book.cover_image} />

                  {book.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              required
              fullWidth
              name="borrowDate"
              label="Tanggal Peminjaman"
              type="datetime-local"
              id="borrowDate"
              InputLabelProps={{ shrink: true, style: { color: darkMode ? "white" : "black" } }}
              InputProps={{ style: { color: darkMode ? "white" : "black" } }}
              value={borrowDate}
              onChange={(e) => setBorrowDate(e.target.value)}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? "Mengirim..." : "Kirim"}
            </Button>

            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body2" color="success" align="center">
                {success}
              </Typography>
            )}
          </Box>
        </Box>
      </div>
    </Layout>
  );
};

export default BookBorrowForm;
