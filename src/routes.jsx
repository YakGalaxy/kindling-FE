import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import LandingPage from "./components/pages/LandingPage";
import KitsPage from "./components/pages/KitsPage";
import KitCreationPage from "./components/pages/KitCreationPage";
import ProfilePage from "./components/pages/ProfilePage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kits" element={<ProtectedRoute element={KitsPage} />} />
      <Route
        path="/kits/create"
        element={<ProtectedRoute element={KitCreationPage} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={ProfilePage} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
