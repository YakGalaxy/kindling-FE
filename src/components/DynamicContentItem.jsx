import React from "react";
import { TextField } from "@mui/material";

const DynamicContentItem = ({ item, index, onChange, editMode }) => {
  const handleItemChange = (e) => {
    onChange(index, e.target.value);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      multiline
      value={item.value}
      onChange={handleItemChange}
      InputProps={{
        readOnly: !editMode,
      }}
      sx={{ backgroundColor: "#616161", color: "#fff", borderRadius: 1 }}
    />
  );
};

export default DynamicContentItem;
