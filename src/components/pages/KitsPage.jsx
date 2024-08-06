import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";
import HandoverKitService from "../../services/handoverKitService"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService"; // Ensure this path is correct
import Header from "../../components/header"; 

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
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ pt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Handover Kits
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogout}
          sx={{ mb: 2 }}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/kits/create")}
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
            <List>
              {kits.map((kit) => (
                <ListItem key={kit._id} button>
                  <ListItemText primary={kit.title} />
                </ListItem>
              ))}
            </List>
            {kits.length === 0 && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                No handover kits available.
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default KitsPage;
