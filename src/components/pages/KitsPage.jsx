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
import { logout } from "../../services/authService";

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

  const handleCreateNewKit = () => {
    navigate("/kits/create");
  };

  const displayedKits = kits.slice(0, 7);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 4}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Handover Kits
        </Typography>
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
              {displayedKits.length > 0 ? (
                displayedKits.map((kit) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={kit._id}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "transform 0.3s, box-shadow 0.3s", // Added transition for smooth effect
                        "&:hover": {
                          transform: "scale(1.05)", // Scale up slightly on hover
                          boxShadow: 6, // Increase shadow on hover
                        },
                      }}
                      onClick={() => handleKitClick(kit._id)}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={kit.imageUrl || "https://picsum.photos/150.webp?grayscale"}
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
              {/* Update "Create New Kit" card */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: "#6a1b9a",
                    color: "white",
                    transition:
                      "background-color 0.3s, transform 0.3s, box-shadow 0.3s", // Added transition for smooth effect
                    "&:hover": {
                      backgroundColor: "#4a148c",
                      transform: "scale(1.05)", // Scale up slightly on hover
                      boxShadow: 6, // Increase shadow on hover
                    },
                  }}
                  onClick={handleCreateNewKit}
                >
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" component="div">
                      Create a new Kit
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default KitsPage;
