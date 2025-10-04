import { Container, Typography, Box, Paper, CircularProgress, Alert } from "@mui/material";
import { useState } from "react";
import UploadBox from "./components/UploadBox";
import Preview from "./components/Preview";
import DownloadButton from "./components/DownloadButton";

export default function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    // Show original image
    const reader = new FileReader();
    reader.onload = () => setOriginalImage(reader.result as string);
    reader.readAsDataURL(file);
    setLoading(true);
    setProcessedImage(null);
    setError(null);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const res = await fetch("", {
    // const res = await fetch("https://bgremove.azurewebsites.net/predict", {
      method: "POST",
      body: formData,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error("Failed to remove background");
    }

    // Get the response as a blob
    const blob = await res.blob();
    const processedUrl = URL.createObjectURL(blob);
    // Update processed image
    setProcessedImage(processedUrl);

  } catch (err:any) {
    console.error(err);
  if (err.name === "AbortError") {
    setError("The server took too long. Please try again later.");
  } else {
    setError("Error removing background. Please try again.");
  }
  } finally {
      setLoading(false);
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #3ABEF9, #A7E6FF)", // gradient
        display: "flex",
      }}
    >

      <Container maxWidth="md" sx={{ py: 5}} >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            background: "linear-gradient(135deg, #f3f4f6, #aebfe0ff)",
          }}
          >
          <Typography variant="h3" fontWeight="bold" gutterBottom >
            Remove Background With U<sup>2</sup>-net
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.secondary">
            Upload an image
          </Typography>

          <Box mt={3}>
            <UploadBox onUpload={handleUpload} />
          </Box>

          <Box mt={5}>
              {loading ? (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={5}>
                  <CircularProgress size={60} thickness={5} color="primary" />
                  <Typography mt={2} color="text.secondary" fontWeight="bold">
                    Removing background...
                  </Typography>
                </Box>
              ) : (
                <Preview original={originalImage} processed={processedImage} />
              )}
            </Box>

            {error && (
              <Box mt={3}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              </Box>
            )}

            {processedImage && !loading && (
              <Box mt={3}>
                <DownloadButton image={processedImage} />
              </Box>
            )}
        </Paper>
      </Container>
            </Box>
  );
}
