import React from "react";
import Search from "./search";
import { IoIosNotifications } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import DropdownWithImage from "./dropDownWithIcon";
import { useAuth } from "@/context/authContext";

const Navbar: React.FC = () => {
  const { token } = useAuth();
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
        <IoIosNotifications className="text-2xl" />
        <Link to="/cart" className="flex items-center space-x-1">
          <Link to={"/borrow"}>Pinjam Buku</Link>
        </Link>
        <DropdownWithImage optionsProps={optionsProps} placeholder="Account" onSelect={(option) => console.log(option)} />
      </div>
    </div>
  );
};

export default Navbar;
