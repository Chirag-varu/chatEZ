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
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import VoiceCall from "./pages/VoiceCall";
import VideoCall from "./pages/videoCall";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const showNavbarPaths = [
    "/",
    "/Sign-Up",
    "/Log-In",
    "/chat",
    "/profile",
    "/setting",
    "/setting",
    "/voice-call",
    "/video-call",
    "/admin",
  ];
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

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
        <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/Log-In" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/Log-In" />} />
        <Route path="/setting" element={authUser ? <Setting /> : <Navigate to="/Log-In" />} />
        <Route path="/voice-call" element={authUser ? <VoiceCall /> : <Navigate to="/Log-In" />} />
        <Route path="/video-call" element={authUser ? <VideoCall /> : <Navigate to="/Log-In" />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;

// TODO:
// make chat page
