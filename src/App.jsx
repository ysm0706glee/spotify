import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

import Form from "./components/Form";
import Music from "./components/Music";

import { theme, getData } from "./utils";

const App = () => {
  const [music, setMusic] = useState([]);

  const [randomButton, setRandomButton] = useState(false);

  const [searchWord, setSearchWord] = useState("");

  const [filterByDurationButton, setFilterByDuration] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setMusic([]);
    setFilterByDuration(false);

    getData(
      "https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/random",
      setMusic
    );

    setIsFocused(false);
  }, [randomButton]);

  const handleSearch = (e) => {
    e.preventDefault();

    setMusic([]);
    setFilterByDuration(false);
    setHistory(false);

    getData(
      `https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/search/${searchWord}`,
      setMusic
    );

    setHistory([searchWord, ...history]);
    setSearchWord("");
    setIsFocused(false);
  };

  const handleHistory = (e, x) => {
    e.preventDefault();

    setMusic([]);
    setFilterByDuration(false);

    getData(
      `https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/search/${x}`,
      setMusic
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Form
                setSearchWord={setSearchWord}
                setIsFocused={setIsFocused}
                handleSearch={handleSearch}
                isFocused={isFocused}
                history={history}
                handleHistory={handleHistory}
                searchWord={searchWord}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption">OR</Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setRandomButton(!randomButton)}
              >
                random
              </Button>
            </Grid>

            <Grid item xs={12} alignSelf="end">
              <Button
                color="primary"
                sx={{
                  marginBottom: "0.5rem",
                }}
                onClick={() => setFilterByDuration(!filterByDurationButton)}
              >
                by duration
              </Button>
            </Grid>
          </Grid>
        </Box>

        {music.length && (
          <>
            <Grid container spacing={3}>
              <Music
                music={music}
                filterByDurationButton={filterByDurationButton}
                setIsFocused={setIsFocused}
              />
            </Grid>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
