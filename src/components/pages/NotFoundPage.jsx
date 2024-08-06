import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ pt: 4, textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: "6rem", fontWeight: "bold" }}
          >
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            Sorry, the page you are looking for does not exist.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default NotFoundPage;
