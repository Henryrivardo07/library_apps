import React, { useState, useEffect } from "react";
import { getBorrow } from "../../utils/apis/borrow";
import { CircularProgress, Typography, Box, Grid, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import Layout from "@/components/main-layout";

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const respone = await getBorrow(); // Mengambil data buku dari API
        setBooks(respone.payload.datas); // Menyimpan data buku ke dalam state
        setLoading(false); // Menghentikan loading setelah data berhasil dimuat
      } catch (error: any) {
        setError(error.message || "Failed to fetch books"); // Menangani error jika terjadi kesalahan saat mengambil data
        setLoading(false); // Menghentikan loading dalam kondisi error
      }
    };

    fetchBooks(); // Memanggil fungsi fetchBooks saat komponen dimuat
  }, []);

  if (loading) {
    return <CircularProgress />; // Menampilkan spinner loading jika data sedang dimuat
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Menampilkan pesan error jika gagal mengambil data
  }

  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom>
          My Books
        </Typography>
        <Grid container spacing={3}>
          {books.map((book: any) => (
            <Grid item key={book.id} xs={3}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={book.book.cover_image} alt={book.title} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Borrow Date: {book.borrow_date}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default MyBooks;
