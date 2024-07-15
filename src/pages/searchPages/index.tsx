import Layout from "@/components/main-layout";
import { searchBook } from "@/utils/apis/books";
import { IBook } from "@/utils/types/book";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { Container, Grid, Typography, Paper } from "@mui/material";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        if (query) {
          const response = await searchBook(query);
          console.log("Pencarian buku:", response); // Debugging log
          if (response && response.payload && response.payload.datas && response.payload.datas.length > 0) {
            setBooks(response.payload.datas);
            setError(null);
          } else {
            setBooks([]);
            setError("No books found");
          }
        } else {
          setBooks([]);
          setError("Missing query parameter");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div style={{ minHeight: "100vh", paddingTop: 20, paddingBottom: 20 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            Search Results for "{query}"
          </Typography>
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                <Paper elevation={3} className={`bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${darkMode ? "dark:bg-gray-800" : "dark:bg-white"}`}>
                  <img src={book.cover_image} alt={book.title} className="w-full h-auto object-cover" style={{ aspectRatio: "2/3" }} />
                  <div className="p-4">
                    <Typography variant="h6" gutterBottom className={`${darkMode ? "dark:text-gray-200" : "text-gray-800"}`}>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" className={`${darkMode ? "dark:text-gray-400" : "text-gray-600"}`}>
                      {book.author}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default SearchPage;
