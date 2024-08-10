import React from "react";
import { Button, Container, Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3, // Adjust margin bottom for spacing
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "#fff", // Ensure text color is white for better contrast
              mr: 1, // Margin right to create space between text and icon
            }}
          >
            Kindling
          </Typography>
          <IconButton
            sx={{
              color: "primary.main",
            }}
          >
            <WhatshotIcon fontSize="large" />
          </IconButton>
        </Box>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Create and manage handover kits easily.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSignUp}
             // Margin-right for spacing between buttons
          >
            Sign Up
          </Button>
          <Typography variant="body1" sx={{ mx: 2 }}>
            or
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;
