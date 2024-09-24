// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Contact from "./Contact";
import { Box, Fade } from "@mui/material";

function App() {
  const location = useLocation();

  return (
    <Box>
      <Header />
      <Fade in={true} timeout={500}>
        <Box sx={{ padding: 2 }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            {/* Add more routes here if needed */}
          </Routes>
        </Box>
      </Fade>
    </Box>
  );
}

export default App;
