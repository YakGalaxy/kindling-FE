import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const KitHeader = ({ kit, editMode, handleChange }) => {
  return (
    <Box sx={{ flex: "1 1 33%", pr: 2 }}>
      <TextField
        name="title"
        label="Title"
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
    </Box>
  );
};

export default KitHeader;
