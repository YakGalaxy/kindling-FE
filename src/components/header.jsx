import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={() => handleNavigate("/")}
          sx={{ mr: 2 }}
        >
          <Typography variant="h6">Kindling</Typography>
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={() => handleNavigate("/kits")}>
          Kits
        </Button>
        <Button color="inherit" onClick={() => handleNavigate("/profile")}>
          Profile
        </Button>
        <Button color="inherit" onClick={handleAuthAction}>
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
