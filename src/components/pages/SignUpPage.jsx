import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Avatar,
  Link,
  Grid,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

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
    <>
      <Header />
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // Aligns items horizontally
            mb: 2, // Adds some margin below the heading
          }}
        >
          <Typography variant="h4" component="h1">
            Sign Up
          </Typography>
          <Avatar sx={{ bgcolor: "primary.main", ml: 1 }}>
            {" "}
            {/* Added mr: 1 for margin */}
            <WhatshotIcon />
          </Avatar>
        </Box>
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

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" sx={{ mt: 2 }}>
                Already have an account?
              </Link>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUpPage;
