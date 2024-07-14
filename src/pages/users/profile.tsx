import React from "react";
import Avatar from "@mui/material/Avatar";
import Layout from "../../components/main-layout";
import { Container, Paper } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";

const Profile: React.FC = () => {
  const { darkMode } = useDarkMode();

  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "50%",
            bgcolor: darkMode ? "primary.dark" : "background.default",
            color: darkMode ? "common.white" : "text.primary",
            padding: 4,
            borderRadius: 8,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: darkMode ? "primary.main" : "secondary.main",
              marginBottom: 2,
            }}
            alt="Profile Picture"
            src="/avatar.jpg" // Ganti dengan URL avatar Anda atau gunakan avatar dari konteks autentikasi
          />
          <div>
            <h1 style={{ textAlign: "center" }}>Profile</h1>
            <p style={{ textAlign: "center" }}>{darkMode ? "Dark mode is on!" : "Light mode is on!"}</p>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Profile;
