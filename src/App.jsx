import React from "react";
import AppRoutes from "./routes";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <Router>
    <CssBaseline />
    <AppRoutes />
  </Router>
);

export default App;
