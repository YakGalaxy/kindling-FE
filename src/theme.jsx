import { createTheme } from "@mui/material/styles";

// Define a dark color palette 
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7C4DFF", // Dark purple
    },
    secondary: {
      main: "#4D4D4D", // Dark grey for secondary elements
    },
    background: {
      default: "#121212", // Dark background color
      paper: "#1D1D1D", // Slightly lighter background for paper elements
    },
    text: {
      primary: "#E0E0E0", // Light text color for primary text
      secondary: "#B0B0B0", // Slightly darker text color for secondary text
    },
  },
  typography: {
    // Customize typography if needed
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
  },
});

export default theme;
