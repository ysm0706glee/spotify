import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Form from "./components/Form";
import RandomMusic from "./components/RandomMusic";
import SearchMusic from "./components/SearchMusic";

const getData = async (url, setFuc) => {
  try {
    const res = await axios.get(url);
    setFuc(res.data.items);
  } catch (error) {
    console.error(error);
  }
};

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
    <div>
      <Form
        setSearchWord={setSearchWord}
        setIsFocused={setIsFocused}
        handleSearch={handleSearch}
        isFocused={isFocused}
        history={history}
        handleHistory={handleHistory}
      />

      <button onClick={() => setRandomButton(!randomButton)}>random</button>

      <button onClick={() => setFilterByDuration(!filterByDurationButton)}>
        filter by duration
      </button>

      {randomMusic.length && (
        <RandomMusic
          randomMusic={randomMusic}
          filterByDurationButton={filterByDurationButton}
        />
      )}

      {searchMusic.length && (
        <SearchMusic
          searchMusic={searchMusic}
          filterByDurationButton={filterByDurationButton}
        />
      )}
    </div>
  );
};

export default App;
