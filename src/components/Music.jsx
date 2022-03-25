import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Music = ({ music, filterByDurationButton }) => {
  return (
    <>
      {music
        .sort((a, b) => {
          if (filterByDurationButton) {
            return (
              Math.floor((a.duration_ms % 3600) / 60) -
              Math.floor((b.duration_ms % 3600) / 60)
            );
          } else {
            return music;
          }
        })
        .map((x) => {
          return (
            <Grid key={x.id} item xs={12}>
              <Paper elevation={3}>
                <Box
                  padding={1}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <a
                      rel="noreferrer"
                      href={x.album.external_urls.spotify}
                      target="_blank"
                    >
                      <img src={x.album.images[2].url} alt={x.album.name} />
                      <PlayCircleIcon
                        sx={{
                          position: "relative",
                          right: "30%",
                          borderRadius: "50%",
                          border: "0px none",
                          backgroundColor: "#000000",
                          color: "#1DB954",
                        }}
                      ></PlayCircleIcon>
                    </a>
                    <Box>
                      <Typography variant="subtitle1">
                        {x.album.name}
                      </Typography>
                      <Typography variant="subtitle2">
                        {x.album.artists[0].name}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="caption" display="block" gutterBottom>
                    {Math.floor((x.duration_ms % 3600) / 60)} minutes
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
    </>
  );
};

export default Music;
