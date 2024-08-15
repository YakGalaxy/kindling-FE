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
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import HandoverKitService from "../../services/handoverKitService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { logout } from "../../services/authService";
import ProfileService from "../../services/profileService";

const KitsPage = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        if (profileId) {
          const response = await ProfileService.getProfileById(profileId);
          console.log("Profile response:", response.data);
          if (response.data && response.data._id) {
            setUserId(response.data._id);
          } else {
            throw new Error("User ID not found in profile data");
          }
        }
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setError("Failed to fetch user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      HandoverKitService.getAllKits(userId)
        .then((response) => {
          setKits(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to load kits.");
          setLoading(false);
          console.error(error);
        });
    }
  }, [userId]);

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

  const handleDelete = (kitId) => {
    if (window.confirm("Are you sure you want to delete this kit?")) {
      HandoverKitService.deleteKit(kitId)
        .then(() => {
          setKits((prevKits) => prevKits.filter((kit) => kit._id !== kitId));
        })
        .catch((error) => {
          setError("Failed to delete kit. Please try again.");
          console.error(error);
        });
    }
  };

  const displayedKits = kits.slice(0, 7);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              alignSelf: "flex-start",
              mb: 4,
            }}
          >
            Your Kits
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Box sx={{ width: "100%", mb: 4 }}>
                <Grid container spacing={4}>
                  {displayedKits.length > 0 ? (
                    displayedKits.map((kit) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={kit._id}>
                        <Card
                          sx={{
                            position: "relative",
                            cursor: "pointer",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: 6,
                            },
                          }}
                          onClick={() => handleKitClick(kit._id)}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={
                              kit.imageUrl ||
                              "https://picsum.photos/150.webp?grayscale"
                            }
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
                          <IconButton
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              right: 8,
                              color: "#d32f2f",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(kit._id);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Alert
                      severity="warning"
                      sx={{ mb: 2, alignSelf: "flex-start" }}
                    >
                      You have no handover kits available.
                    </Alert>
                  )}
                </Grid>
              </Box>
              <Card
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#6a1b9a",
                  color: "white",
                  transition:
                    "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  mb: 4,
                  "&:hover": {
                    backgroundColor: "#4a148c",
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                  alignSelf: "flex-start",
                  maxWidth: 300,
                }}
                onClick={handleCreateNewKit}
              >
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6" component="div">
                    Create a new Kit
                  </Typography>
                </Box>
              </Card>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default KitsPage;
