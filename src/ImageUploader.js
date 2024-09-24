// src/ImageUploader.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Slider,
  Button,
  Card,
  Fade,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [blur, setBlur] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError("Unsupported file type. Please upload an image.");
      setOpenSnackbar(true);
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
      setBlur(0);
    };

    if (file) {
      setLoading(true);
      reader.readAsDataURL(file);
      // Simulate loading delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleBlurChange = (event, newValue) => {
    setBlur(newValue);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Card
        {...getRootProps()}
        sx={{
          border: "2px dashed #1976d2",
          borderRadius: 2,
          padding: 4,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
          transition: "background-color 0.3s ease",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="h6" color="primary">
            Drop the image here...
          </Typography>
        ) : (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 50, color: "#1976d2" }} />
            <Typography variant="h6" color="textSecondary">
              Drag & drop an image here, or click to select one
            </Typography>
          </Box>
        )}
      </Card>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {image && !loading && (
        <Fade in={Boolean(image)} timeout={500}>
          <Box sx={{ mt: 4 }}>
            <Typography gutterBottom>Blur: {blur}px</Typography>
            <Slider
              value={blur}
              onChange={handleBlurChange}
              aria-labelledby="blur-slider"
              valueLabelDisplay="auto"
              min={0}
              max={20}
              color="primary"
            />

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                maxHeight: "80vh", // Limit the height to viewport height
                borderRadius: 2,
                border: "1px solid #ddd",
                padding: 1,
                boxShadow: 3,
                backgroundColor: "#fafafa",
                transition: "all 0.3s ease",
              }}
            >
              <Zoom>
                <img
                  src={image}
                  alt="Uploaded"
                  style={{
                    filter: `blur(${blur}px)`,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    height: "auto",
                    width: "auto",
                    transition: "filter 0.3s ease",
                    cursor: "zoom-in",
                  }}
                />
              </Zoom>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setImage(null)}
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                Remove Image
              </Button>
            </Box>
          </Box>
        </Fade>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImageUploader;
