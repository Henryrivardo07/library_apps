import React from "react";
import { TextField, Button, Typography, Container, Grid, Paper, ThemeProvider, createTheme } from "@mui/material";
import Layout from "../../components/main-layout";
import { useDarkMode } from "@/context/DarkModeContext"; // Pastikan impor useDarkMode dari konteks DarkMode

const AddNewBook: React.FC = () => {
  const { darkMode } = useDarkMode(); // Mengambil nilai darkMode dari konteks

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tambahkan logika untuk menyimpan data buku
    console.log("Form submitted!");
  };

  // Buat tema untuk aplikasi dengan mode terang dan gelap
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Atur mode sesuai dengan darkMode dari konteks
      primary: {
        main: "#1976d2", // Ubah warna utama sesuai kebutuhan
      },
      secondary: {
        main: "#dc004e", // Ubah warna sekunder sesuai kebutuhan
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <div className={`min-h-screen flex justify-center items-center ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900`}>
          <Container maxWidth="sm">
            <Paper elevation={3} className="p-4 mt-4">
              <Typography variant="h5" component="h2" gutterBottom className={`text-gray-800 dark:text-white`}>
                Add New Book
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="title"
                      name="title"
                      label="Title"
                      variant="outlined"
                      className={`text-gray-800`}
                      InputProps={{
                        className: `${darkMode ? "dark:text-white" : ""}`, // Atur warna teks sesuai dengan darkMode
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="author"
                      name="author"
                      label="Author"
                      variant="outlined"
                      className={`text-gray-800`}
                      InputProps={{
                        className: `${darkMode ? "dark:text-white" : ""}`, // Atur warna teks sesuai dengan darkMode
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="category"
                      name="category"
                      label="Category"
                      variant="outlined"
                      className={`text-gray-800`}
                      InputProps={{
                        className: `${darkMode ? "dark:text-white" : ""}`, // Atur warna teks sesuai dengan darkMode
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="isbn"
                      name="isbn"
                      label="ISBN"
                      variant="outlined"
                      className={`text-gray-800`}
                      InputProps={{
                        className: `${darkMode ? "dark:text-white" : ""}`, // Atur warna teks sesuai dengan darkMode
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      className={`text-gray-800`}
                      InputProps={{
                        className: `${darkMode ? "dark:text-white" : ""}`, // Atur warna teks sesuai dengan darkMode
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default AddNewBook;
