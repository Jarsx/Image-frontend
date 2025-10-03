import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";

interface DownloadButtonProps {
  image: string;
}

export default function DownloadButton({ image }: DownloadButtonProps) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = "background-removed.png";
    a.click();
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<Download />}
      onClick={handleDownload}
    >
      Download Image
    </Button>
  );
}
