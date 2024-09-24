// src/ImageUploader.js
import React, { useCallback, useState, useRef } from "react";
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

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

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

  const handleDownload = () => {
    if (!imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    // Calculate the scale factor between natural and displayed size
    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;
    const scaleFactor = Math.min(scaleX, scaleY); // Use the smaller scale to maintain aspect ratio

    // Set canvas dimensions to natural size
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Apply scaled blur filter
    ctx.filter = `blur(${blur * scaleFactor}px)`;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Create a link to download the image
    const link = document.createElement("a");
    link.download = "blurred-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const hasChanged = blur > 0;

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
                  ref={imageRef}
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
                  mr: 2, // Adds right margin for spacing
                }}
              >
                Remove Image
              </Button>

              {hasChanged && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownload}
                  sx={{
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Download Blurred Image
                </Button>
              )}
            </Box>

            {/* Hidden Canvas for Image Processing */}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
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
