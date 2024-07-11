import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/main-layout";
import axiosWithConfig from "../../utils/apis/axiosWithConfig";
import { IRegister } from "../../utils/types/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const fullName = data.get("fullName") as string;
    const phoneNumber = data.get("phoneNumber") as string;
    const retypePassword = data.get("retypePassword") as string;

    try {
      const response = await axiosWithConfig.post<IRegister>("/signup", {
        email,
        password,
        fullName,
        phoneNumber,
        retypePassword,
      });
      console.log("Signup response:", response.data);

      // Set token in cookies
      Cookies.set("token", response.data.token, { expires: 7 }); // Expires in 7 days

      setLoading(false);
      navigate("/"); // Redirect to main page after successful signup
    } catch (error: any) {
      console.error("Error signing up:", error.response?.data || error.message);
      setError(error.response?.data.message || "Network response was not ok");
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main", cursor: "pointer" }} src={avatar || ""}>
                {!avatar && <LockOutlinedIcon />}
              </Avatar>
            </label>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="fullName" label="Full Name" name="fullName" autoComplete="name" autoFocus />
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              <TextField margin="normal" required fullWidth name="phoneNumber" label="Phone Number" type="tel" id="phoneNumber" autoComplete="tel" />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
              <TextField margin="normal" required fullWidth name="retypePassword" label="Retype Password" type="password" id="retypePassword" autoComplete="new-password" />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
}

export default SignUp;
