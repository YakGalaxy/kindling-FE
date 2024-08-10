import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const predefinedLinks = [
  {
    title: "GitHub Repository",
    description: "Add a repository",
    image: "https://placehold.co/150",
    url: "https://github.com",
  },
  {
    title: "Miro Board",
    description: "Add a Miro board",
    image: "https://placehold.co/150",
    url: "https://miro.com",
  },
  {
    title: "Office 365 Item",
    description: "Add an O365 item",
    image: "https://placehold.co/150",
    url: "https://office.com",
  },
  {
    title: "Google Sheet",
    description: "Add a Google Sheet",
    image: "https://placehold.co/150",
    url: "https://sheets.google.com",
  },
];

const LinkCards = ({ onLinkClick }) => {
  return (
    <Grid container spacing={2}>
      {predefinedLinks.map((link, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card sx={{ cursor: "pointer" }} onClick={() => onLinkClick(link)}>
            <CardMedia
              component="img"
              height="140"
              image={link.image}
              alt={link.title}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {link.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {link.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LinkCards;
