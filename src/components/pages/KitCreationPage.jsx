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
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          pt: 4,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "#2c2c2c", // Dark background color
            color: "#fff", // Light text color for contrast
            p: 4,
            borderRadius: 1,
            boxShadow: 1,
            width: "100%",
            maxWidth: "600px", // Control max width
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Kit
          </Typography>
          <Divider sx={{ bgcolor: "#444", mt: 1 }} />{" "}
          {/* Darker divider color */}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              InputLabelProps={{
                style: { color: "#fff" }, // Light label color
              }}
              InputProps={{
                style: { color: "#fff" }, // Light input text color
              }}
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
              InputLabelProps={{
                style: { color: "#fff" }, // Light label color
              }}
              InputProps={{
                style: { color: "#fff" }, // Light input text color
              }}
            />

            {error && (
              <Alert severity="error" sx={{ my: 2, bgcolor: "#d32f2f" }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Create"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/kits")}
              sx={{ mt: 2 }}
              fullWidth
            >
              Back
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default KitCreationPage;
