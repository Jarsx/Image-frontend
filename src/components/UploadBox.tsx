import { Box, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

interface UploadBoxProps {
  onUpload: (file: File) => void;
}

export default function UploadBox({ onUpload }: UploadBoxProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUpload />}
      >
        Upload Image
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Button>
    </Box>
  );
}
