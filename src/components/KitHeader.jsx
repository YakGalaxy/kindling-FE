import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const KitHeader = ({
  kit,
  editMode,
  handleChange,
  handleSave,
  setEditMode,
}) => {
  const handleEditToggle = () => setEditMode(!editMode);

  return (
    <Box sx={{ flex: "1 1 33%", pr: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Kit Details
      </Typography>
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
      <Box sx={{ display: "flex", gap: 2 }}>
        {editMode ? (
          <>
            <Button variant="contained" color="primary" onClick={handleSave}>
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
  );
};

export default KitHeader;
