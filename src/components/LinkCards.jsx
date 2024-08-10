import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const LinkCards = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
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
  );
};

export default LinkCards;
