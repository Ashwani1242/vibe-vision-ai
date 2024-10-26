// import HomePage from "./components/pages/home/HomePage";
// import LoginPage from "./components/pages/auth/LoginPage";
// import AuthPage from "./components/pages/auth/AuthPage";
// import AnimatedCursor from "react-animated-cursor";
import { Navigate, Route, Routes } from "react-router-dom";
// import SignupPage from "./components/pages/auth/SignupPage";
// import MyGallery from "./components/pages/MyGallery";
// import ComedyShowPage from "./components/pages/videogen/ComedyShowPage";
// import PricingPage from "./components/pages/PricingPage";
// import WhatsNewPage from "./components/pages/WhatsNewPage";
// import KidsMusicPage from "./components/pages/musicgen/KidsMusicPage";

import Sidebar from "./components/Sidebar";
import VideoGenerationPage from "./components/pages/videogen/VideoGenerationPage";
import KidsMusicPage from "./components/pages/musicgen/KidsMusicPage";
import CreatePage from "./components/pages/CreatePage";
import HomePage from "./components/pages/home/HomePage";
import PricingPage from "./components/pages/PricingPage";
import WhatsNewPage from "./components/pages/WhatsNewPage";
import AuthPage from "./components/pages/auth/AuthPage";
import LoginPage from "./components/pages/auth/LoginPage";
import SignupPage from "./components/pages/auth/SignupPage";

function App() {
  return (
    <div id="" className="flex flex-col justify-center items-center overflow-x-hidden cursor-none/">

      <div className="flex w-screen h-screen max-h-screen">
        <Sidebar />
        <Routes >
          <Route path="/" element={<Navigate to='/create' />} />
          <Route path="/explore" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} >
            <Route index element={<Navigate to="video" />} />
            <Route path="video" element={<VideoGenerationPage />} />
            <Route path="music" element={<KidsMusicPage />} />
          </Route>
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/whats-new" element={<WhatsNewPage />} />
          <Route path="/auth" element={<AuthPage />} >
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </div>

      {/* <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} >
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/gallery" element={<MyGallery />} />
        <Route path="/comedy-show" element={<ComedyShowPage />} />
        <Route path="/kids-music" element={<KidsMusicPage />} />
      </Routes> */}
    </div>
  );
}

export default App;
