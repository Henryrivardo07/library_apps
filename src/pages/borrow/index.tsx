import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Layout from "../../components/main-layout";
import { Borrow } from "../../utils/apis/borrow";
import moment from "moment";

const BookBorrowForm: React.FC = () => {
  const [bookId, setBookId] = useState<string>("");
  const [borrowDate, setBorrowDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formattedDate = moment(borrowDate).toISOString();
      console.log("Tanggal Peminjaman Terformat:", formattedDate);

      const response = await Borrow([parseInt(bookId)], formattedDate);
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
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h5">
            Peminjaman Buku
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="bookId" label="ID Buku" name="bookId" autoComplete="bookId" autoFocus value={bookId} onChange={(e) => setBookId(e.target.value)} />
            <TextField
              margin="normal"
              required
              fullWidth
              name="borrowDate"
              label="Tanggal Peminjaman"
              type="datetime-local"
              id="borrowDate"
              InputLabelProps={{ shrink: true }}
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
      </Container>
    </Layout>
  );
};

export default BookBorrowForm;
