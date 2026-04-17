# image-blur-tool

A lightweight web utility for blurring images. Upload an image, adjust the blur level with a slider, and preview or download the result — all client-side, no server required.

🔗 **Live:** https://svrohith9.github.io/image-blur-tool

## Features

- Drag-and-drop or click-to-upload image input
- Adjustable blur radius with live preview
- Image zoom for reviewing detail
- Download the blurred image
- Fully client-side — your files never leave the browser

## Stack

- React 18
- Material UI v6 (`@mui/material`, `@mui/icons-material`)
- `react-dropzone` for uploads
- `react-medium-image-zoom` for preview
- Formik + Yup for form state and validation
- Create React App build

## Run locally

```bash
npm install
npm start
```

Opens on `http://localhost:3000`.

## Build

```bash
npm run build
```

Static files in `build/`. Deploy anywhere (already configured for GitHub Pages — the app lives at https://svrohith9.github.io/image-blur-tool).

## Project structure

```
src/
├── App.js               # Router + theme
├── Header.js            # Top navigation
├── Home.js              # Landing + uploader host
├── ImageUploader.js     # Core drop-zone + blur logic
├── Contact.js
├── theme.js             # MUI theme config
└── index.js
```

## License

MIT
