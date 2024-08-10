import React, { useState, useEffect } from "react";
import { Container, Box, CircularProgress, Alert } from "@mui/material";
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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box sx={{ display: "flex", mb: 4 }}>
          <Box sx={{ flex: "1 1 33%", pr: 2 }}>
            <KitHeader
              kit={kit}
              setKit={setKit}
              editMode={editMode}
              setEditMode={setEditMode}
            />
            <AddContentButtons addContentItem={addContentItem} />
            <LinkCards />
          </Box>

          <Box sx={{ flex: "1 1 67%", pl: 2 }}>
            <KitSharingLinks kit={kit} />
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
