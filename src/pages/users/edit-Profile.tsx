import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/main-layout";
import { useAuth } from "@/context/authContext";

const EditProfile: React.FC = () => {
  const { avatar, login } = useAuth();
  const [newAvatar, setNewAvatar] = useState<string | null>(avatar);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result as string);
        // You should also update the avatar in the context and cookies
        login(localStorage.getItem("token") || "", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <ThemeProvider theme={createTheme()}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="upload-avatar">
              <input id="upload-avatar" type="file" style={{ display: "none" }} onChange={handleImageUpload} />
              <Avatar sx={{ m: 1, bgcolor: "secondary.main", cursor: "pointer" }} src={newAvatar || ""}>
                {!newAvatar && <Typography variant="h5">Upload Avatar</Typography>}
              </Avatar>
            </label>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" fullWidth id="name" label="Name" name="name" autoFocus />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default EditProfile;
