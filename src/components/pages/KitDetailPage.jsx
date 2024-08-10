import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import HandoverKitService from "../../services/handoverKitService";
import KitHeader from "../KitHeader";
import KitSharingLinks from "../KitSharingLinks";
import KitContent from "../KitContent";
import AddContentButtons from "../AddContentButtons";
import LinkCards from "../LinkCards";

const KitDetailPage = () => {
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [contentItems, setContentItems] = useState([]);
  const { kitId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    HandoverKitService.getKitById(kitId)
      .then((response) => {
        setKit(response.data);
        setContentItems(response.data.contentItems || []);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load kit details.");
        setLoading(false);
      });
  }, [kitId]);

  const addContentItem = (type) => {
    setContentItems((prevItems) => [
      ...prevItems,
      { id: Date.now().toString(), type, value: "" },
    ]);
  };

  const handleContentChange = (index, newValue) => {
    setContentItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, value: newValue } : item
      )
    );
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
      });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const shareableUrl = `${import.meta.env.VITE_FRONTEND_URL}/kits/${kitId}`;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box sx={{ display: "flex", mb: 4 }}>
          <Box sx={{ flex: "1 1 33%", pr: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Kit Details
            </Typography>
            {!editMode ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
                sx={{ mb: 2 }}
              >
                Edit
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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
              </Box>
            )}
            <KitHeader
              kit={kit}
              editMode={editMode}
              handleChange={(e) => {
                const { name, value } = e.target;
                setKit((prevKit) => ({ ...prevKit, [name]: value }));
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
              Add Text
            </Typography>
            <AddContentButtons addContentItem={addContentItem} />
            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
              Add Links
            </Typography>
            <LinkCards />
          </Box>

          <Box sx={{ flex: "1 1 67%", pl: 2 }}>
            <KitSharingLinks shareableUrl={shareableUrl} />
            <KitContent
              contentItems={contentItems}
              setContentItems={setContentItems}
              handleContentChange={handleContentChange}
              editMode={editMode}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default KitDetailPage;
