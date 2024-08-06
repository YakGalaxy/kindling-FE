import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import api from "../../services/api"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import Header from "../../components/header"; 

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // To handle login errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", form);
      const { authToken } = response.data; // Ensure this matches backend response
      localStorage.setItem("token", authToken); // Store the JWT token
      navigate("/Kits"); // Redirect to desired page
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 2, width: "100%" }}>
            <Button
              variant="text"
              color="secondary"
              onClick={handleReturnHome}
              fullWidth
            >
              Return to Homepage
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
