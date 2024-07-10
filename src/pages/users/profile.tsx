import React from "react";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "@/context/authContext";
import Layout from "../../components/main-layout";
import { Container, Typography, Box } from "@mui/material";

const Profile: React.FC = () => {
  const { avatar } = useAuth();

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={avatar || ""} />
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {avatar ? "Avatar uploaded successfully!" : "No avatar uploaded."}
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default Profile;
