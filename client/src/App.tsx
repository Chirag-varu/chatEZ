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
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import JoinRoom from "./pages/joinRoom";
import JoiningRoom from "./pages/JoiningRoom";

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
    "/joiningRoom",
  ];
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { authAdmin, checkAuthAdmin } = useUserStore();
  console.log("online users:", onlineUsers);

  useEffect(() => {
    checkAuth();
    checkAuthAdmin();
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
        <Route path="/admin-login" element={!authAdmin ? <AdminLogin /> : <Navigate to="/admin" />} />
        <Route path="/admin" element={authAdmin ? <Admin /> : <Navigate to="/admin-login" />} />
        <Route path="/joinRoom/:rommID" element={authUser ? <JoinRoom/> : <Navigate to="chat"/>}/>
        <Route path="/joiningRoom" element={authUser ? <JoiningRoom/> : <Navigate to="chat"/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;

// TODO:
// many and all msg delete feature - M
// make group chat feature like making private room and adding user to that room and user will get req if they accept they will be added to that room - H
// make friend request feature where user can send friend request to other user and add them to group without permission - H
// make friend list feature where user can see their friend list and chat with them - 
// add web rtc for voice and video call feature - H
// add notification feature for grp name, friend request, group request, etc - M

