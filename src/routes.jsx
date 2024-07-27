import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import HandoverKitsPage from "./pages/HandoverKitsPage";
import CreateHandoverKitPage from "./pages/CreateHandoverKitPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/kits"
          element={<ProtectedRoute element={HandoverKitsPage} />}
        />
        <Route
          path="/kits/create"
          element={<ProtectedRoute element={CreateHandoverKitPage} />}
        />
      </Routes>
  );
}

export default App;
