import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import Layout from "../../components/main-layout";
import { useAuth } from "@/context/authContext";
import { login } from "../../utils/apis/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar as CustomAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button as CustomButton } from "@/components/ui/button";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// Schema validasi menggunakan Zod
const schema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const EditProfile: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const { login: contextLogin, avatar: authAvatar } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const avatarFile = data.avatar && data.avatar[0] ? data.avatar[0] : null;

    try {
      const response = await login(data.email, data.password, avatarFile);
      console.log("Login response:", response);

      if (response.payload && response.payload.token) {
        const token = response.payload.token;
        const avatar = response.payload.avatar || "";
        contextLogin(token, avatar);
        toast.success("Profile updated and login successful!");
        navigate("/");
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

  // Theme for dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Container component="main" maxWidth="xs" sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
          <Card sx={{ width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your profile information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 0 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter your full name" {...register("fullName")} />
                    {errors.fullName && <Typography color="error">{errors.fullName.message}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
                    {errors.email && <Typography color="error">{errors.email.message}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
                    {errors.password && <Typography color="error">{errors.password.message}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your address" {...register("address")} />
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" type="tel" placeholder="Enter your phone number" {...register("phoneNumber")} />
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <CustomAvatar>
                        <AvatarImage src={authAvatar || "/placeholder-user.jpg"} />
                        <AvatarFallback>JP</AvatarFallback>
                      </CustomAvatar>
                      <Button variant="outlined" component="label">
                        Upload
                        <input type="file" hidden onChange={handleImageUpload} />
                      </Button>
                    </div>
                  </Grid>
                </Grid>
                <CardFooter>
                  <CustomButton type="submit" disabled={loading}>
                    Save Changes
                  </CustomButton>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default EditProfile;
