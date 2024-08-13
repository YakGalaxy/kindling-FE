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
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "", // Keep the password field blank initially
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const profileId = localStorage.getItem("profileId"); // Get profile ID from localStorage

  useEffect(() => {
    if (!profileId) {
      setError("No profile ID found.");
      return;
    }

    setLoading(true);
    ProfileService.getProfileById(profileId) // Fetch profile by ID
      .then((response) => {
        const { user } = response.data;
        setProfile({
          username: user.username,
          email: user.email,
          password: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch profile.");
        setLoading(false);
        console.error(error);
      });
  }, [profileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  // Create an object with only the fields to be updated
  const updatedProfile = {
    username: profile.username,
    email: profile.email,
    ...(profile.password && { password: profile.password }), // Only include password if it's provided
  };

  ProfileService.updateProfile(profileId, updatedProfile)
    .then(() => {
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
          <TextField
            label="Password"
            name="password"
            type="password"
            value={profile.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter new password"
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
