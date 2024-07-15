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
import { useDarkMode } from "../../context/DarkModeContext"; // assuming this context is implemented
import { toast, Toaster } from "react-hot-toast"; // Import toast

function SignUp() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); // assuming this hook provides dark mode state

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const fullName = data.get("fullName") as string;
    const phoneNumber = data.get("phoneNumber") as string;
    const retypePassword = data.get("retypePassword") as string;
    const address = data.get("address") as string;

    if (password !== retypePassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosWithConfig.post<IRegister>("/signup", {
        full_name: fullName,
        email,
        password,
        role: "user",
        address,
        phone_number: phoneNumber,
      });

      console.log("Signup response:", response.data);

      // Set token in cookies
      Cookies.set("token", response.data.token, { expires: 7 }); // Expires in 7 days

      setLoading(false);
      toast.success("Registration successful!"); // Display success toast
      navigate("/signin"); // Redirect to signin page after successful signup
    } catch (error: any) {
      console.error("Error signing up:", error.response?.data || error.message);
      setError(error.response?.data.message || "Network response was not ok");
      toast.error(error.response?.data.message || "Registration failed!"); // Display error toast
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
      <ThemeProvider theme={createTheme({ palette: { mode: darkMode ? "dark" : "light" } })}>
        <Toaster /> {/* Add Toaster component */}
        <Container component="main" maxWidth="xs" className="mb-10">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: darkMode ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "32px",
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main", cursor: "pointer" }} src={avatar || ""}>
                {!avatar && <LockOutlinedIcon />}
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
                <TextField margin="normal" required fullWidth id="fullName" label="Full Name" name="fullName" autoComplete="name" autoFocus />
                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                <TextField margin="normal" required fullWidth name="phoneNumber" label="Phone Number" type="tel" id="phoneNumber" autoComplete="tel" />
                <TextField margin="normal" required fullWidth name="address" label="Address" type="text" id="address" autoComplete="address" />
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                <TextField margin="normal" required fullWidth name="retypePassword" label="Retype Password" type="password" id="retypePassword" autoComplete="new-password" />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button variant="outlined" component="label">
                  Upload Avatar
                  <input type="file" id="avatar" name="avatar" onChange={handleImageUpload} hidden />
                </Button>
                {error && (
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                )}
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
}

export default SignUp;
