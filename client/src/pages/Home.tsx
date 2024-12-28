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
} from "lucide-react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import chat_image from "../assets/login dark.jpg";
import { motion } from "framer-motion";

function Home() {
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
      description: "Seamless video calls without interruption",
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
      description: "To monitor and manage users",
    },
    {
      icon: <ShieldIcon size={24} />,
      title: "User Verification",
      description: "Verified user badges",
    },
  ];

  const words = [
    {
      text: "Chat",
    },
    {
      text: "freely",
    },
    {
      text: "and",
    },
    {
      text: "securely",
    },
    {
      text: "with",
    },
    {
      text: "chatEZ.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="min-h-screen dark:bg-gray-900 bg-gray-50">
        <main className="pt-4">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-center dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
              {/* Text Section */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-lg sm:text-6xl font-extrabold dark:text-white text-gray-900 text-center">
                  <TypewriterEffectSmooth words={words} />
                </h1>
                <p className="text-xl dark:text-gray-300 text-gray-600">
                  Experience the next generation of secure messaging with chatEZ
                </p>
                <p className="mt-1 text-xl dark:text-gray-300 text-gray-600">
                  only chat app you will ever need
                </p>
                <div className="mt-10">
                  <a
                    href="/Sign-Up"
                    className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-lg transform transition hover:scale-105"
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
                  className="w-full max-w-md lg:max-w-lg rounded-lg shadow-lg dark:bg-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2 className="text-3xl font-bold text-center mb-16 dark:text-white text-gray-900">
              Powerful Features for Modern Communication
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl dark:bg-gray-800 bg-white dark:hover:bg-gray-700 hover:bg-gray-50 shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="inline-block p-3 rounded-lg dark:bg-gray-700 bg-blue-100">
                    <div className="dark:text-blue-400 text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold dark:text-white text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 dark:text-gray-400 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-16 dark:bg-gray-800 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold dark:text-white text-gray-900">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg dark:text-gray-300 text-gray-600">
                users trust ChatEZ for their communication needs
              </p>
              <div className="mt-8">
                <a
                  href="/Sign-Up"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up Now
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="dark:bg-gray-900 bg-gray-100 dark:text-gray-400 text-gray-600 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>© 2024 chatEZ.</p>
            <p>Made with ❤️ by Chirag Varu</p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

export default Home;
