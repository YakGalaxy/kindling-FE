import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
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
      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Handover Kit
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
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
      </Container>
    </>
  );
};

export default KitCreationPage;
