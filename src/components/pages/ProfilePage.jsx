import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import ProfileService from "../../services/profileService"; 
import Header from "../../components/header"; 

const ProfilePage = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [error, setError] = useState(""); // For handling errors
  const [success, setSuccess] = useState(""); // For successful updates
  const [loading, setLoading] = useState(false); // For handling loading state

  useEffect(() => {
    setLoading(true);
    ProfileService.getProfile()
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch profile.");
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    ProfileService.updateProfile(profile)
      .then((response) => {
        setSuccess("Profile updated successfully!");
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to update profile.");
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
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
        {loading && <CircularProgress sx={{ mb: 2 }} />}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            label="Username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
