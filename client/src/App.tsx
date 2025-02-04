import {
  Routes, Route, Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import { ThemeProvider } from "./Components/theme-provider";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import UpdatePassword from './pages/UpdatePassword'
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import VoiceCall from "./pages/VoiceCall";
import VideoCall from "./pages/videoCall";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const showNavbarPaths = [
    "/",
    "/Sign-Up",
    "/Log-In",
    "/Log-In/update-password",
    "/chat",
    "/profile",
    "/setting",
    "/setting",
    "/voice-call",
    "/video-call",
    "/admin",
    "/admin-login",
  ];
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log("online users:", onlineUsers);  

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const shouldHaveNavbar = showNavbarPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ScrollToTop />
      {shouldHaveNavbar ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sign-Up" element={!authUser ? <SignUp /> : <Navigate to="/chat" />} />
        <Route path="/Log-In" element={!authUser ? <LogIn /> : <Navigate to="/chat" />} />
        <Route path="/Log-In/update-password" element={<UpdatePassword />} />
        <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/Log-In" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/Log-In" />} />
        <Route path="/setting" element={authUser ? <Setting /> : <Navigate to="/Log-In" />} />
        <Route path="/voice-call" element={authUser ? <VoiceCall /> : <Navigate to="/Log-In" />} />
        <Route path="/video-call" element={authUser ? <VideoCall /> : <Navigate to="/Log-In" />} />
        <Route path="/admin" element={authUser ? <Admin /> : <Navigate to="/admin-login" />} />
        <Route path="/admin-login" element={!authUser ? <AdminLogin /> : <Navigate to="/admin" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;

// TODO:
// improve chat page
// make message encryption and decryption for security
// utils folder and make config file where all api route will be and base url will come from env file
// should make adminAuth for protecting admin route
// sendOTP route is open mean attracter can attac from post-man so need to add some security

