import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useDarkMode } from "@/context/DarkModeContext";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
