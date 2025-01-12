import { useState, useEffect } from "react";
import { Sun, Moon, LogOut, User } from "lucide-react";
import logo from "../assets/favicon_T.png";
import { useTheme } from "./theme-provider";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? storedDarkMode === "true" : false;
  });
  const { logout, authUser } = useAuthStore();

  const { setTheme } = useTheme();

  const handleMode = () => {
    setTheme(darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav
      className={`fixed w-full shadow-lg z-50 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/chat" className="flex items-center">
            <img
              src={logo}
              alt="chatEZ logo"
              className={`h-10 transition-transform transform ${darkMode ? "filter brightness-75" : ""
                }`}
            />
            <span
              className="ml-2 text-2xl font-extrabold tracking-tight"
            >
              chatEZ
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleMode}
              className={`p-2 rounded-lg transition-transform transform hover:scale-105 ${darkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-yellow-300 hover:text-gray-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-300 hover:text-gray-800"
                }`}
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">{authUser.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
