import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import logo from "../assets/favicon_T.png";
import { useTheme } from "./theme-provider";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize darkMode from localStorage to prevent flash of light mode
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? storedDarkMode === "true" : false;
  });

  const { setTheme } = useTheme();

  const handleMode = () => {
    if (!darkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Store the dark mode state in localStorage
    localStorage.setItem("darkMode", darkMode.toString());
    // Apply dark or light theme to the body element
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav
      className={`fixed w-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className={`h-10 ${darkMode ? "filter brightness-75" : ""}`}
            />
            <span
              className={`ml-2 text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              chatEZ
            </span>
          </div>
          <button
            onClick={handleMode}
            className={`p-2 rounded-lg ${
              darkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
