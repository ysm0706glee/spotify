import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Form from "./components/Form";
import RandomMusic from "./components/RandomMusic";
import SearchMusic from "./components/SearchMusic";

import { theme, getData } from "./utils";

const App = () => {
  const [randomMusic, setRamdomMusic] = useState([]);
  const [randomButton, setRandomButton] = useState(false);

  const [searchWord, setSearchWord] = useState("");
  const [searchMusic, setSearchMusic] = useState([]);

  const [filterByDurationButton, setFilterByDuration] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setSearchMusic([]);
    setFilterByDuration(false);

    getData(
      "https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/random",
      setRamdomMusic
    );
  }, [randomButton]);

  const handleSearch = (e) => {
    e.preventDefault();

    setRamdomMusic([]);
    setFilterByDuration(false);
    setHistory(false);

    getData(
      `https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/search/${searchWord}`,
      setSearchMusic
    );

    setHistory([searchWord, ...history]);
  };

  const handleHistory = (e, x) => {
    e.preventDefault();

    setRamdomMusic([]);
    setFilterByDuration(false);

    getData(
      `https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/search/${x}`,
      setSearchMusic
    );
  };

  return (
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
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption">OR</Typography>
          </Grid>

          <Grid item xs={12}>
            <ThemeProvider theme={theme}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setRandomButton(!randomButton)}
              >
                random
              </Button>
            </ThemeProvider>
          </Grid>

          <Grid item xs={12} alignSelf="end">
            <ThemeProvider theme={theme}>
              <Button
                color="primary"
                sx={{
                  marginBottom: "0.5rem",
                }}
                onClick={() => setFilterByDuration(!filterByDurationButton)}
              >
                by duration
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Box>

      {randomMusic.length && (
        <>
          <Grid container spacing={3}>
            <RandomMusic
              randomMusic={randomMusic}
              filterByDurationButton={filterByDurationButton}
            />
          </Grid>
        </>
      )}

      {searchMusic.length && (
        <>
          <Grid container spacing={3}>
            <SearchMusic
              searchMusic={searchMusic}
              filterByDurationButton={filterByDurationButton}
            />
          </Grid>
        </>
      )}
    </Container>
  );
};

export default App;
