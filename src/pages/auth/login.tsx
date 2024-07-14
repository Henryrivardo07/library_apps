// src/pages/SignIn.tsx

import React, { useState } from "react";
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
import { login as loginService } from "../../utils/apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useDarkMode } from "@/context/DarkModeContext";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const SignIn: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();
  const { darkMode } = useDarkMode();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const avatarFile = avatar; // Use the avatar state for upload

    try {
      const response = await loginService(data.email, data.password, avatarFile);
      console.log("Login response:", response);

      if (response.payload && response.payload.token) {
        const { token, avatar, role } = response.payload;
        contextLogin(token, avatar, role); // Pass role to contextLogin
        toast.success("Login successful!");

        // Redirect based on role
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error: any) {
      console.error("Error logging in:", error.response?.data || error.message);
      toast.error(error.response?.data.message || "Network response was not ok");
    } finally {
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

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="min-h-screen flex items-center justify-center mt-40">
          <CssBaseline />
          <Toaster />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: darkMode ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              color: darkMode ? "white" : "black",
            }}
          >
            <label htmlFor="upload-avatar">
              <input id="upload-avatar" name="avatar" type="file" style={{ display: "none" }} onChange={handleImageUpload} />
              <Avatar sx={{ m: 1, bgcolor: "secondary.main", cursor: "pointer" }} src={avatar || ""}>
                {!avatar && <LockOutlinedIcon />}
              </Avatar>
            </label>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputLabelProps={{ style: { color: darkMode ? "white" : "black" } }}
                InputProps={{ style: { color: darkMode ? "white" : "black" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputLabelProps={{ style: { color: darkMode ? "white" : "black" } }}
                InputProps={{ style: { color: darkMode ? "white" : "black" } }}
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default SignIn;
