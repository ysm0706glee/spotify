import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../utils";

const Form = ({
  setSearchWord,
  setIsFocused,
  handleSearch,
  isFocused,
  history,
  handleHistory,
  searchWord,
}) => {
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <FormControl variant="standard" sx={{ marginRight: "0.5rem" }}>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </FormControl>

      <ThemeProvider theme={theme}>
        <Button
          color="primary"
          variant="contained"
          onClick={(e) => handleSearch(e)}
        >
          search
        </Button>
      </ThemeProvider>

      {isFocused && history.length && (
        <>
          {history.map((x, i) => (
            <Box key={i}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ cursor: "pointer" }}
                onClick={(e) => handleHistory(e, x)}
              >
                {x}
              </Typography>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Form;
