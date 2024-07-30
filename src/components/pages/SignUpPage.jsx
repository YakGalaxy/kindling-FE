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

const SignUpPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(""); // To handle signup errors
  const [success, setSuccess] = useState(""); // To handle successful signup
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (form.password.length < 3) {
      setError("Password must be at least 3 characters long.");
      return;
    }

    try {
      const response = await api.post("/auth/signup", form); // Using the API service instance
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after a short delay
    } catch (error) {
      console.error("Signup Error:", error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
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
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
