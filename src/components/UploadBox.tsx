import { Box, Button, Typography } from "@mui/material";
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
        sx={{ borderRadius: 5, px: 3, py: 1 }}
      >
        <Typography fontWeight={"bold"} >
        Upload Image
        </Typography>
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Button>
    </Box>
  );
}
