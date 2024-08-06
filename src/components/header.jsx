// Header.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Kindling Logo */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={() => handleNavigate("/")}
          sx={{ mr: 2 }}
        >
          <Typography variant="h6">Kindling</Typography>
        </IconButton>

        {/* Spacer to push buttons to the far right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Buttons */}
        <Button color="inherit" onClick={() => handleNavigate("/kits")}>
          Kits
        </Button>
        <Button color="inherit" onClick={() => handleNavigate("/profile")}>
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
