import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Sign-Up" element={<SignUp />} />
        <Route path="/Log-In" element={<LogIn />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/voice-call" element={<VoiceCall />} />
        <Route path="/video-call" element={<VideoCall />} /> */}
      </Routes>
    </>
  );
}

export default App;

// TODO:
// implement react router dom make routes and install daisy ui
