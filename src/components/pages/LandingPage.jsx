import React from "react";
import { logout } from "../../services/authService";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Handover Creation Tool</h1>
      <p>Create and manage your handover kits easily.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default LandingPage;
