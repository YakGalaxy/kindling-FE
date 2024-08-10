import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  Grid,
  Checkbox,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic client-side validation
    if (!form.email || !form.password) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", form);
      const { authToken, profileId } = response.data;
      localStorage.setItem("token", authToken);
      localStorage.setItem("profileId", profileId);
      navigate("/kits");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              Login
            </Typography>
            <Avatar sx={{ bgcolor: "primary.main", ml: 1 }}>
              <WhatshotIcon />
            </Avatar>
          </Box>
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
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
              sx={{ mt: 1 }}
            />
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </Button>
            </Box>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account?
                </Link>
              </Grid>
            </Grid>
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
