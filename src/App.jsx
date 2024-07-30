import React from "react";
import AppRoutes from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import KeyboardShortcutsProvider from "./utils/KeyboardShortcutsProvider"; 
import theme from "./theme"; 

const App = () => (
  <ThemeProvider theme={theme}>
    <KeyboardShortcutsProvider>
      <Router>
        <CssBaseline />
        <AppRoutes />
      </Router>
    </KeyboardShortcutsProvider>
  </ThemeProvider>
);

export default App;
