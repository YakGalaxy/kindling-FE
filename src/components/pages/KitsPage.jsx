import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import HandoverKitService from "../../services/handoverKitService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { logout } from "../../services/authService"; // Ensure this path is correct

const KitsPage = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    HandoverKitService.getAllKits()
      .then((response) => {
        setKits(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load kits.");
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleKitClick = (kitId) => {
    navigate(`/kits/${kitId}`);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Handover Kits
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/kits/create")}
          sx={{ mb: 4 }}
        >
          Create New Kit
        </Button>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Grid container spacing={4}>
              {kits.length > 0 ? (
                kits.map((kit) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={kit._id}>
                    <Card
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleKitClick(kit._id)}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={kit.imageUrl || "https://placehold.co/150"} // Placeholder image if none provided
                        alt={kit.title}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {kit.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {kit.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  No handover kits available.
                </Typography>
              )}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default KitsPage;
