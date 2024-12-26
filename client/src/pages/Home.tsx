import { useState } from "react";
import {
  Shield,
  Lock,
  Video,
  Phone,
  Image as ImageIcon,
  FileVideo,
  Bot,
  Search,
  UserCheck,
  Upload,
  Users,
  FileText,
  Smile,
  UserCog,
  Shield as ShieldIcon,
  Sun,
  Moon,
} from "lucide-react";
import logo from "../assets/favicon.png";
import chat_image from "../assets/login dark.jpg";
import { motion } from "framer-motion";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const features = [
    {
      icon: <Lock size={24} />,
      title: "Encrypted Messages",
      description: "End-to-end encryption for ultimate privacy",
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Authorization",
      description: "Multi-factor authentication & secure login",
    },
    {
      icon: <Phone size={24} />,
      title: "Voice Calls",
      description: "Crystal-clear voice calls with friends",
    },
    {
      icon: <Video size={24} />,
      title: "Video Calls",
      description: "HD video calls with screen sharing",
    },
    {
      icon: <ImageIcon size={24} />,
      title: "Image Sharing",
      description: "Share moments instantly",
    },
    {
      icon: <FileVideo size={24} />,
      title: "Video Upload",
      description: "Share videos with your contacts",
    },
    {
      icon: <Bot size={24} />,
      title: "AI Assistant",
      description: "Smart AI-powered chat assistance",
    },
    {
      icon: <Search size={24} />,
      title: "User Search",
      description: "Find friends easily",
    },
    {
      icon: <UserCheck size={24} />,
      title: "User Tracking",
      description: "See who's online in real-time",
    },
    {
      icon: <Upload size={24} />,
      title: "Profile Updates",
      description: "Customize your profile",
    },
    {
      icon: <FileText size={24} />,
      title: "PDF Support",
      description: "Share documents seamlessly",
    },
    {
      icon: <Smile size={24} />,
      title: "GIF Support",
      description: "Express yourself with GIFs",
    },
    {
      icon: <Users size={24} />,
      title: "Group Chats",
      description: "Create and manage group conversations",
    },
    {
      icon: <UserCog size={24} />,
      title: "Admin Panel",
      description: "Powerful admin controls",
    },
    {
      icon: <ShieldIcon size={24} />,
      title: "User Verification",
      description: "Verified user badges",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`min-h-screen ${
          darkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
      >
        <nav
          className={`fixed w-full ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg z-50`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="logo"
                  className={`h-10 ${
                    darkMode ? "bg-gradient-to-r from-blue-500" : ""
                  }`}
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
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-yellow-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </nav>

        <main className="pt-4">
          {/* Hero Section */}
          <div
            className={`relative bg-gradient-to-br ${
              darkMode
                ? "from-gray-900 to-bg-gray-900"
                : "from-gray-50 to-white"
            }`}
          >
            <div
              className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-center ${
                darkMode ? "bg-gradient-to-r from-gray-900 to-gray-700" : ""
              }`}
            >
              {/* Text Section */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1
                  className={`text-4xl sm:text-6xl font-extrabold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Connect Securely, Chat Freely
                </h1>
                <p
                  className={`mt-6 text-xl ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Experience the next generation of secure messaging with chatEZ
                </p>
                <p
                  className={`mt-1 text-xl ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  only chat app you will ever need
                </p>
                <div className="mt-10">
                  <a
                    href="#"
                    className={`inline-block bg-gradient-to-r ${
                      darkMode
                        ? "from-blue-400 to-indigo-600"
                        : "from-blue-600 to-indigo-500"
                    } text-white px-8 py-3 rounded-full font-medium shadow-lg transform transition hover:scale-105`}
                  >
                    Get Started
                  </a>
                </div>
              </div>

              {/* Image Section */}
              <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end">
                <img
                  src={chat_image}
                  alt="Hero"
                  className={`w-full max-w-md lg:max-w-lg rounded-lg shadow-lg ${
                    darkMode ? "bg-gray-800" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* <hr /> */}

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2
              className={`text-3xl font-bold text-center mb-16 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Powerful Features for Modern Communication
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  } shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-blue-100"
                    }`}
                  >
                    <div
                      className={darkMode ? "text-blue-400" : "text-blue-600"}
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <h3
                    className={`mt-4 text-xl font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className={`${darkMode ? "bg-gray-800" : "bg-blue-50"} py-16`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Ready to get started?
              </h2>
              <p
                className={`mt-4 text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                users trust ChatEZ for their communication needs
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up Now
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className={`${
            darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-600"
          } py-8`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>Made with ❤️ by Chirag Varu</p>
            <p>© 2024 chatEZ.</p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

export default Home;
