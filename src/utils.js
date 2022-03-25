import { createTheme } from "@mui/material/styles";
import axios from "axios";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F18D5F",
      contrastText: "#ffffff",
    },
  },
});

export const getData = async (url, setFuc) => {
  try {
    const res = await axios.get(url);
    setFuc(res.data.items);
  } catch (error) {
    console.error(error);
  }
};
