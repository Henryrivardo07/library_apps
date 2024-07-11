import React from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ButtonDarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const label = darkMode ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="dark-mode-toggle">{label}</Label>
      <Switch id="dark-mode-toggle" checked={darkMode} onChange={toggleDarkMode} className="bg-gray-200 dark:bg-gray-700" />
    </div>
  );
};

export default ButtonDarkMode;
