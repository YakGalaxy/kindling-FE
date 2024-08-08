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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Delete } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

const KitDetailPage = () => {
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareableUrl, setShareableUrl] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [contentItems, setContentItems] = useState([]);
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
    const updatedKit = {
      title: kit.title,
      description: kit.description,
      contentItems,
    };

    HandoverKitService.updateKit(kitId, updatedKit)
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

  const addContentItem = (type) => {
    setContentItems((prevItems) => [
      ...prevItems,
      { id: uuidv4(), type, value: "" },
    ]);
  };

  const handleContentChange = (index, newValue) => {
    setContentItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, value: newValue } : item
      )
    );
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
              <Button
                variant="outlined"
                sx={{ flex: "1 1 auto" }}
                onClick={() => addContentItem("title")}
              >
                Title
              </Button>
              <Button
                variant="outlined"
                sx={{ flex: "1 1 auto" }}
                onClick={() => addContentItem("description")}
              >
                Description
              </Button>
              <Button
                variant="outlined"
                sx={{ flex: "1 1 auto" }}
                onClick={() => addContentItem("paragraph")}
              >
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Kit Details
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
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
            </Box>

            {/* Kit Sharing Links Section */}
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

            {/* Divider Underneath Kit Sharing Links */}
            <Divider sx={{ my: 4 }} />

            {/* New Large Container for Dynamic Content */}
            <Box
              sx={{
                backgroundColor: "#2c2c2c", // Darker background
                borderRadius: 1,
                minHeight: "500px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                color: "#fff", // White text color for better contrast
              }}
            >
              <Typography variant="h6" gutterBottom>
                Handover Kit Content
              </Typography>

              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) return;

                  const reorderedItems = Array.from(contentItems);
                  const [movedItem] = reorderedItems.splice(
                    result.source.index,
                    1
                  );
                  reorderedItems.splice(result.destination.index, 0, movedItem);

                  setContentItems(reorderedItems);
                }}
              >
                <Droppable droppableId="contentItemsDroppable">
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {contentItems.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          Click on the "Title", "Description", or "Paragraph"
                          buttons on the left to add items here.
                        </Typography>
                      ) : (
                        contentItems.map((item, index) => (
                          <Draggable
                            key={item.id} // Use unique ID from item
                            draggableId={item.id} // Use unique ID from item
                            index={index}
                          >
                            {(provided) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  backgroundColor: "#444", // Slightly lighter background for the fields
                                  borderRadius: 1,
                                  padding: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  label={
                                    item.type.charAt(0).toUpperCase() +
                                    item.type.slice(1)
                                  }
                                  value={item.value}
                                  onChange={(e) =>
                                    handleContentChange(index, e.target.value)
                                  }
                                  multiline={item.type === "paragraph"}
                                  rows={item.type === "paragraph" ? 4 : 1}
                                  InputLabelProps={{
                                    style: { color: "#fff" }, // White label text
                                  }}
                                  InputProps={{
                                    style: { color: "#fff" }, // White input text
                                  }}
                                />
                                <IconButton
                                  color="error"
                                  onClick={() =>
                                    setContentItems((prevItems) =>
                                      prevItems.filter((_, i) => i !== index)
                                    )
                                  }
                                >
                                  <Delete />
                                </IconButton>
                              </Box>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default KitDetailPage;

