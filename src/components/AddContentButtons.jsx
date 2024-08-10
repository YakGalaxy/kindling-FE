import React from "react";
import { Button, Box } from "@mui/material";

const AddContentButtons = ({ addContentItem }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Button variant="outlined" onClick={() => addContentItem("title")}>
        Title
      </Button>
      <Button variant="outlined" onClick={() => addContentItem("description")}>
        Description
      </Button>
      <Button variant="outlined" onClick={() => addContentItem("paragraph")}>
        Paragraph
      </Button>
      <Button variant="outlined" onClick={() => addContentItem("url")}>
        URL
      </Button>
    </Box>
  );
};

export default AddContentButtons;
