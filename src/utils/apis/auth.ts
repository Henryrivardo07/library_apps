// authApi.ts

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
