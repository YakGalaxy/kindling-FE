// src/routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import HandoverKitCreationPage from "./components/pages/HandoverKitCreationPage";
import HandoverKitsPage from "./components/pages/HandoverKitsPage";
import ProfilePage from "./components/pages/ProfilePage";
import NotFoundPage from "./components/pages/NotFoundPage";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/handover-kits/create"
        element={<HandoverKitCreationPage />}
      />
      <Route path="/handover-kits" element={<HandoverKitsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
