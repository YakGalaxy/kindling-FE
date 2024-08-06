import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { logout } from "../../services/authService";
import Header from "../../components/header"; 


const LandingPage = () => {
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
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the Handover Creation Tool
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Create and manage your handover kits easily.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;
