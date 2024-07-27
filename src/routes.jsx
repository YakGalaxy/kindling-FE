// src/routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import KitCreationPage from "./components/pages/KitCreationPage";
import KitsPage from "./components/pages/KitsPage";
import ProfilePage from "./components/pages/ProfilePage";
import NotFoundPage from "./components/pages/NotFoundPage";

const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/handover-kits/create"
        element={<KitCreationPage />}
      />
      <Route path="/handover-kits" element={<KitsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default AppRoutes;
