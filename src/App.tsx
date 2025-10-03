import { Container, Typography, Box, Paper } from "@mui/material";
import { useState } from "react";
import UploadBox from "./components/UploadBox";
import Preview from "./components/Preview";
import DownloadButton from "./components/DownloadButton";
// import axios from "axios";

export default function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
  // Show original image
  const reader = new FileReader();
  reader.onload = () => setOriginalImage(reader.result as string);
  reader.readAsDataURL(file);
  setProcessedImage(reader.result as string);


//   try {
//     setLoading(true);             // 🔹 Start loading
//     setProcessedImage(null);      // Reset old result if any
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("https://bgremove.azurewebsites.net/predict", {
//       method: "POST",
//       body: formData,
//     });

//     if (!res.ok) {
//       throw new Error("Failed to remove background");
//     }

//     // Get the response as a blob
//     const blob = await res.blob();
//     const processedUrl = URL.createObjectURL(blob);

//     // Update processed image
//     setProcessedImage(processedUrl);

//   } catch (err) {
//     console.error(err);
//     alert("Error removing background");
//   } finally {
//     setLoading(false); 
//   }
};


  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Remove Background With U<sup>2</sup>-net

        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Upload an image
        </Typography>

        <Box mt={3}>
          <UploadBox onUpload={handleUpload} />
        </Box>

        <Box mt={5}>
          <Preview original={originalImage} processed={processedImage} />
        </Box>

        {processedImage && (
          <Box mt={3}>
            <DownloadButton image={processedImage} />
          </Box>
        )}
      </Paper>
    </Container>
  );
}
