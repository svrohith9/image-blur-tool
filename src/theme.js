// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // You can customize the primary color
    },
    secondary: {
      main: "#ff6347", // Custom secondary color
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    // Add more typography variants as needed
  },
  components: {
    // Customize MUI components here
  },
});

export default theme;
