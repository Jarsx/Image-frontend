import Grid from "@mui/material/Grid";
import { Card, CardMedia, Typography} from "@mui/material";

interface PreviewProps {
  original: string | null;
  processed: string | null;
}

export default function Preview({ original, processed }: PreviewProps) {
  if (!original) {
    return (
      <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
        Upload an image to see preview
      </Typography>
    );
  }

  return (
    <Grid container direction="row" spacing={10} justifyContent={"center"}>
      <Grid>
          <Typography variant="subtitle1" fontWeight={"bold"} mb={1}>
            Original
          </Typography>
          <Card sx={{ boxShadow: 4, borderRadius: 3, display: "inline-block" }}>
            <CardMedia
              component="img"
              image={original}
              alt="Original"
              sx={{
                display: "block",
                maxWidth:  "100%", // prevents overflow
                height: "250px",   // keeps aspect ratio
              }}
            />
          </Card>
      </Grid>

      <Grid>
        <Typography variant="subtitle1" mb={1} fontWeight={"bold"} >
          Background Removed
        </Typography>
        <Card sx={{ boxShadow: 4, borderRadius: 3, display: "inline-block" }}>
            <CardMedia
              component="img"
              image={processed || ""}
              alt="Processed"
              sx={{
                display: "block",
                maxWidth: "100%", // prevents overflow
                height: "250px",   // keeps aspect ratio
              }}
            />
          </Card>
      </Grid>
    </Grid>
  );
}
