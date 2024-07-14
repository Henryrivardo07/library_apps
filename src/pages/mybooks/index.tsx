import React, { useState, useEffect } from "react";
import { getBorrow } from "../../utils/apis/borrow";
import { CircularProgress, Typography, Box, Grid, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import Layout from "@/components/main-layout";

const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBorrow();
        setBooks(booksData);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to fetch books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Layout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          My Books
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {books.map((book: any) => (
            <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    title={book.title}
                    component="img"
                    height="50" // Sesuaikan tinggi gambar sesuai keinginan Anda
                    image={book.cover_image || "/placeholder-book.jpg"} // Ganti dengan placeholder jika cover_image tidak ada
                    alt={book.title}
                    sx={{ objectFit: "cover" }} // Mengatur properti objectFit
                    loading="lazy" // Menggunakan lazy loading
                  />
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
