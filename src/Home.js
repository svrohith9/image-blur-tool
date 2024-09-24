// src/Home.js
import React from "react";
import ImageUploader from "./ImageUploader";
import { Box, Typography, Container, Grid } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2" gutterBottom>
            Welcome to Image Blur Tool
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Upload your image and adjust the blur level to your preference.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageUploader />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
