import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, CopyAll } from "@mui/icons-material";
import HandoverKitService from "../../services/handoverKitService";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";

const KitDetailPage = () => {
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareableUrl, setShareableUrl] = useState("");
  const [editMode, setEditMode] = useState(false); // New state for edit mode
  const { kitId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    HandoverKitService.getKitById(kitId)
      .then((response) => {
        setKit(response.data);
        setShareableUrl(`${import.meta.env.VITE_FRONTEND_URL}/kits/${kitId}`);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load kit details.");
        setLoading(false);
        console.error(error);
      });
  }, [kitId]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareableUrl);
    alert("URL copied to clipboard!");
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setLoading(true);
    HandoverKitService.updateKit(kitId, {
      title: kit.title,
      description: kit.description,
    })
      .then((response) => {
        setKit(response.data);
        setEditMode(false);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to update kit.");
        setLoading(false);
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKit((prevKit) => ({ ...prevKit, [name]: value }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

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
              name="title"
              label="Kit Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={kit.title}
              onChange={handleChange}
              InputProps={{
                readOnly: !editMode,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={kit.description}
              onChange={handleChange}
              InputProps={{
                readOnly: !editMode,
              }}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Text
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
              <Button variant="outlined" sx={{ flex: "1 1 auto" }}>
                Title
              </Button>
              <Button variant="outlined" sx={{ flex: "1 1 auto" }}>
                Description
              </Button>
              <Button variant="outlined" sx={{ flex: "1 1 auto" }}>
                Paragraph
              </Button>
            </Box>
            <Typography variant="h6" component="h3" gutterBottom>
              Links
            </Typography>
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{ cursor: "pointer" }}
                    onClick={() => window.open("https://example.com", "_blank")} // Placeholder link
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://placehold.co/150"
                      alt={`Link ${index + 1}`}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Link Title {index + 1}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Short description for Link {index + 1}.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Right Section */}
          <Box sx={{ flex: "1 1 67%", pl: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Kit Details
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Divider sx={{ my: 4 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {editMode ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ mr: 2 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditToggle}
                >
                  Edit
                </Button>
              )}
            </Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Kit Sharing Links
            </Typography>
            <Box
              sx={{ p: 2, border: "1px dashed grey", borderRadius: 1, mb: 2 }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                Sharing links or other relevant information will go here.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Tooltip title="Copy URL">
                  <IconButton onClick={handleCopyUrl}>
                    <CopyAll />
                  </IconButton>
                </Tooltip>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {shareableUrl}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Tooltip title="Share on Facebook">
                  <IconButton
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/sharer/sharer.php?u=" +
                          encodeURIComponent(shareableUrl),
                        "_blank"
                      )
                    }
                  >
                    <Facebook />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share on Twitter">
                  <IconButton
                    onClick={() =>
                      window.open(
                        "https://twitter.com/intent/tweet?url=" +
                          encodeURIComponent(shareableUrl),
                        "_blank"
                      )
                    }
                  >
                    <Twitter />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share on LinkedIn">
                  <IconButton
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/shareArticle?url=" +
                          encodeURIComponent(shareableUrl),
                        "_blank"
                      )
                    }
                  >
                    <LinkedIn />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default KitDetailPage;
