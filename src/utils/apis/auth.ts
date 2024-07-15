// authApi.ts
import { IRegister } from "../../utils/types/auth";
import axiosWithConfig from "./axiosWithConfig";
import { ILoginWithToken } from "../../utils/types/auth";

export const login = async (email: string, password: string, avatarFile: File | null | string): Promise<ILoginWithToken> => {
  try {
    const response = await axiosWithConfig.post<ILoginWithToken>("/login", {
      email,
      password,
      avatarFile,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};

export const Register = async (full_name: string, email: string, password: string, role: string, address: string, phone_number: string, token: string): Promise<IRegister> => {
  try {
    const response = await axiosWithConfig.post<IRegister>("/register", {
      full_name,
      email,
      password,
      role,
      address,
      phone_number,
      token,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Network response was not ok");
  }
};
