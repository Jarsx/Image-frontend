import Grid from "@mui/material/Grid";
import { Card, CardMedia, Typography} from "@mui/material";

interface PreviewProps {
  original: string | null;
  processed: string | null;
}

export default function Preview({ original, processed }: PreviewProps) {
  if (!original) {
    return (
      <Typography variant="subtitle1" color="text.secondary">
        Upload an image to see preview
      </Typography>
    );
  }

  return (
    <Grid container spacing={4} justifyContent={"center"} columns={16}>
      <Grid >
        <Typography variant="subtitle1" mb={1}>
          Original
        </Typography>
        <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
          <CardMedia
            component="img"
            height="250"
            image={original}
            alt="Original"
            sx={{ objectFit: "contain" }}
          />
        </Card>
      </Grid>

      <Grid >
        <Typography variant="subtitle1" mb={1}>
          Background Removed
        </Typography>
        <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
          <CardMedia
            component="img"
            height="250"
            image={processed || ""}
            alt="Processed"
            sx={{ objectFit: "contain" }}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
