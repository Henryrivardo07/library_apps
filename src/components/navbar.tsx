import React from "react";
import Search from "./search";
import { Link } from "react-router-dom";
import DropdownWithImage from "./dropDownWithIcon";
import { useAuth } from "@/context/authContext";

const Navbar: React.FC = () => {
  const { token, role } = useAuth();
  const optionsProps = token ? [] : ["Login", "Register"];

  const handleSearch = (query: string) => {
    console.log(`Search query: ${query}`);
  };

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-blue-500 text-white shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">Henry BookHouse</Link>
      </div>

      <Search onSearch={handleSearch} placeholder="Search Books..." />

      <div className="flex items-center space-x-4">
        {role !== "admin" && (
          <Link to="/borrow" className="flex items-center space-x-1">
            Pinjam Buku
          </Link>
        )}
        <DropdownWithImage optionsProps={optionsProps} placeholder="Account" onSelect={(option) => console.log(option)} />
      </div>
    </div>
  );
};

export default Navbar;
