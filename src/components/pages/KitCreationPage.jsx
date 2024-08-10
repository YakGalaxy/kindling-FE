import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import HandoverKitService from "../../services/handoverKitService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const KitCreationPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newKit = { title, description };

    HandoverKitService.createKit(newKit)
      .then((response) => {
        console.log("Handover Kit Created:", response.data);
        navigate("/kits");
      })
      .catch((error) => {
        setError("Failed to create kit. Please try again.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box sx={{ display: "flex", mb: 4 }}>
          {/* Left Section */}
          <Box sx={{ flex: "1 1 33%", pr: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Kit Title
            </Typography>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Description
            </Typography>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Box>

          {/* Right Section */}
          <Box sx={{ flex: "1 1 67%", pl: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Create New Kit
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Divider sx={{ my: 4 }} />
            <form onSubmit={handleSubmit}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Create"}
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default KitCreationPage;
