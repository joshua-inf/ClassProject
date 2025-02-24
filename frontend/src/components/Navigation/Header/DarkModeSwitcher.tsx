import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-bold transition-colors hover:bg-gray-300 dark:bg-gray-800  dark:hover:bg-gray-700"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-900 dark:text-gray-200" />
      )}
    </button>
  );
};

export default DarkModeToggle;
