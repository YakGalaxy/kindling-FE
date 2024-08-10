import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DynamicContentItem from "./DynamicContentItem";
import { Delete } from "@mui/icons-material";

const KitContent = ({ contentItems, setContentItems, editMode }) => {
  const handleContentChange = (index, newValue) => {
    setContentItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, value: newValue } : item
      )
    );
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
              {contentItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        border: "1px solid grey",
                        borderRadius: 1,
                        backgroundColor: "#424242",
                      }}
                    >
                      <DynamicContentItem
                        item={item}
                        index={index}
                        onChange={handleContentChange}
                        editMode={editMode}
                      />
                      {editMode && (
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            setContentItems((prevItems) =>
                              prevItems.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default KitContent;
