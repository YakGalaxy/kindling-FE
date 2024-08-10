import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { Facebook, Twitter, LinkedIn, CopyAll } from "@mui/icons-material";

const KitSharingLinks = ({ shareableUrl }) => {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareableUrl);
    alert("URL copied to clipboard!");
  };

  return (
    <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 1, mb: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Sharing Links
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Tooltip title="Copy URL">
          <IconButton onClick={handleCopyUrl}>
            <CopyAll />
          </IconButton>
        </Tooltip>
        <Typography variant="body1" sx={{ ml: 1, overflowWrap: "break-word" }}>
          {shareableUrl}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Tooltip title="Share on Facebook">
          <IconButton
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareableUrl
                )}`,
                "_blank"
              )
            }
          >
            <Facebook />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share on Twitter">
          <IconButton
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareableUrl
                )}`,
                "_blank"
              )
            }
          >
            <Twitter />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share on LinkedIn">
          <IconButton
            onClick={() =>
              window.open(
                `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                  shareableUrl
                )}`,
                "_blank"
              )
            }
          >
            <LinkedIn />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default KitSharingLinks;
