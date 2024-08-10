import React from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const KitContent = ({
  contentItems,
  setContentItems,
  handleContentChange,
  editMode,
}) => {
  const handleDelete = (index) => {
    setContentItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#2c2c2c",
        borderRadius: 1,
        minHeight: "500px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Handover Kit Content
      </Typography>

      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;

          const reorderedItems = Array.from(contentItems);
          const [movedItem] = reorderedItems.splice(result.source.index, 1);
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
                  Click on the "Title", "Description", "Paragraph", or "URL"
                  buttons on the left to add items here.
                </Typography>
              ) : (
                contentItems.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`draggable-${item.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          backgroundColor: "#444",
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
                            style: { color: "#fff" },
                          }}
                          InputProps={{
                            style: { color: "#fff" },
                          }}
                        />
                        {editMode && (
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(index)}
                            sx={{ color: "#d32f2f" }} // Red color for the trash can icon
                          >
                            <Delete />
                          </IconButton>
                        )}
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
  );
};

export default KitContent;
