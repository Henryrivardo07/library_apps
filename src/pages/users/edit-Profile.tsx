import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar as CustomAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button as CustomButton } from "@/components/ui/button";
import Layout from "../../components/main-layout";
import { useAuth } from "@/context/authContext";
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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../utils/apis/auth";

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
  const { login: contextLogin, avatar: authAvatar } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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

  return (
    <Layout>
      <Card className="w-full max-w-2xl mx-auto mt-28">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter your full name" {...register("fullName")} />
                {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter your address" {...register("address")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" type="tel" placeholder="Enter your phone number" {...register("phoneNumber")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <CustomAvatar className="h-16 w-16">
                    <AvatarImage src={authAvatar || "/placeholder-user.jpg"} />
                    <AvatarFallback>JP</AvatarFallback>
                  </CustomAvatar>
                  <Button variant="outline" component="label">
                    <div className="mr-2 h-4 w-4" />
                    Upload
                    <input type="file" hidden onChange={handleImageUpload} />
                  </Button>
                </div>
              </div>
            </div>
            <CardFooter className="flex justify-end">
              <CustomButton type="submit">Save Changes</CustomButton>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default EditProfile;
