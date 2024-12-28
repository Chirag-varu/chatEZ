import { Routes, Route } from 'react-router-dom';
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
// import useAuthStore from './store/useAuthStore';

function App() {
  // const { authUser } = useAuthStore();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Sign-Up" element={<SignUp />} />
            <Route path="/Log-In" element={<LogIn />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Voice-call" element={<VoiceCall />} />
            <Route path="/video-call" element={<VideoCall />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

// TODO:
// make chat page
// make log in and sign up page
