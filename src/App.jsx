import React from "react";
import AppRoutes from "./routes";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import KeyboardShortcutsProvider from "./utils/KeyboardShortcutsProvider"; 

const App = () => (
  <KeyboardShortcutsProvider>
    <Router>
      <CssBaseline />
      <AppRoutes />
    </Router>
  </KeyboardShortcutsProvider>
);

export default App;
