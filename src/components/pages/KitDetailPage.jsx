// KitDetailPage.js
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
import HandoverKitService from "../../services/handoverKitService";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";

const KitDetailPage = () => {
  const { kitId } = useParams(); // Get the kitId from the URL
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    HandoverKitService.getKitById(kitId) // Ensure this method exists in your service
      .then((response) => {
        setKit(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load kit details.");
        setLoading(false);
        console.error(error);
      });
  }, [kitId]);

  const handleGoBack = () => {
    navigate("/kits");
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ pt: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {kit && (
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  {kit.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {kit.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGoBack}
                >
                  Back to Kits
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default KitDetailPage;
