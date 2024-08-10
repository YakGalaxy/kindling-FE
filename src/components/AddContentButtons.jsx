import React from "react";
import { Button, Typography, Box } from "@mui/material";

const AddContentButtons = ({ addContentItem }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Add Content
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={() => addContentItem("title")}>
          Title
        </Button>
        <Button
          variant="outlined"
          onClick={() => addContentItem("description")}
        >
          Description
        </Button>
        <Button variant="outlined" onClick={() => addContentItem("paragraph")}>
          Paragraph
        </Button>
      </Box>
    </Box>
  );
};

export default AddContentButtons;
