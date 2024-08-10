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
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5005/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const userId = data._id;

        // Fetch the profile associated with the user
        const profileResponse = await ProfileService.getProfileById(userId);
        setProfile({ ...profileResponse.data, password: "" });
      } catch (error) {
        setError("Failed to fetch profile.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ProfileService.updateProfile(profile._id, profile);
      setSuccess("Profile updated successfully!");
      navigate(`/profile/${profile._id}`);
    } catch (error) {
      setError("Failed to update profile.");
      console.error(error);
    } finally {
      setLoading(false);
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
            placeholder="Leave blank to keep current password"
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
