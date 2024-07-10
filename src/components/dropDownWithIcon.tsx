import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { DropdownProps } from "../utils/types/dropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Cookies from "js-cookie";

const DropdownWithImage: React.FC<DropdownProps> = ({ optionsProps, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token, logout, avatar: authAvatar } = useAuth();

  useEffect(() => {
    setAvatar(authAvatar);
  }, [authAvatar]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);

    switch (option) {
      case "Login":
        navigate("/signin");
        break;
      case "Register":
        navigate("/signup");
        break;
      case "Logout":
        logout();
        navigate("/signin");
        break;
      case "Edit Profile":
        navigate("/myprofile/edit");
        break;
      case "Profile":
        navigate("/myprofile");
        break;
      default:
        break;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        Cookies.set("avatar", reader.result as string, { expires: 7 });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <Avatar src={avatar || ""} sx={{ cursor: "pointer" }} onClick={() => setIsOpen(!isOpen)} />
        <input type="file" hidden onChange={handleImageUpload} />
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {token ? (
              <>
                <button onClick={() => handleOptionClick("Edit Profile")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Edit Profile
                </button>
                <button onClick={() => handleOptionClick("Profile")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Profile
                </button>
                <button onClick={() => handleOptionClick("Logout")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Logout
                </button>
              </>
            ) : (
              optionsProps.map((option) => (
                <button key={option} onClick={() => handleOptionClick(option)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  {option}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithImage;
