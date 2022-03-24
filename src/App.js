import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [randomMusic, setRamdomMusic] = useState([]);
  const [randomButton, setRandomButton] = useState(false);

  const [searchWord, setSearchWord] = useState("");
  const [searchMusic, setSearchMusic] = useState([]);

  const [filterByDurationButton, setFilterByDuration] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getRandomMusic = async () => {
      try {
        const res = await axios.get(
          "https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/random"
        );
        setRamdomMusic(res.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    setSearchMusic([]);
    setFilterByDuration(false);
    getRandomMusic();
  }, [randomButton]);

  const handleSearch = (e) => {
    e.preventDefault();
    const getSearchMusic = async () => {
      try {
        const res = await axios.get(
          `https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/search/${searchWord}`
        );
        setSearchMusic(res.data.items);
        setHistory([searchWord, ...history]);
      } catch (error) {
        console.error(error);
      }
    };
    setRamdomMusic([]);
    setFilterByDuration(false);
    setHistory(false);
    getSearchMusic();
  };

  const handleHistory = (e, x) => {
    e.preventDefault();
    const getSearchMusic = async () => {
      try {
        const res = await axios.get(
          `https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/search/${x}`
        );
        setSearchMusic(res.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    setRamdomMusic([]);
    setFilterByDuration(false);
    getSearchMusic();
  };

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={(e) => setSearchWord(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        <button onClick={(e) => handleSearch(e)}>search</button>
        {isFocused && history.length && (
          <>
            {history.map((x, i) => (
              <div key={i}>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleHistory(e, x)}
                >
                  {x}
                </span>
              </div>
            ))}
          </>
        )}
      </form>

      <button onClick={() => setRandomButton(!randomButton)}>random</button>

      <button onClick={() => setFilterByDuration(!filterByDurationButton)}>
        filter by duration
      </button>

      {randomMusic.length &&
        randomMusic
          .sort((a, b) => {
            if (filterByDurationButton) {
              return (
                Math.floor((a.duration_ms % 3600) / 60) -
                Math.floor((b.duration_ms % 3600) / 60)
              );
            } else {
              return randomMusic;
            }
          })
          .map((x) => {
            return (
              <div key={x.id}>
                <img src={x.album.images[2].url} alt={x.album.name} />
                <span>{x.album.name}</span>
                <span>{x.album.artists[0].name}</span>
                <a
                  rel="noreferrer"
                  href={x.album.external_urls.spotify}
                  target="_blank"
                >
                  listen
                </a>
                <span>{Math.floor((x.duration_ms % 3600) / 60)}</span>
              </div>
            );
          })}

      {searchMusic.length &&
        searchMusic
          .sort((a, b) => {
            if (filterByDurationButton) {
              return (
                Math.floor((a.duration_ms % 3600) / 60) -
                Math.floor((b.duration_ms % 3600) / 60)
              );
            } else {
              return searchMusic;
            }
          })
          .map((x) => {
            return (
              <div key={x.id}>
                <img src={x.album.images[2].url} alt={x.album.name} />
                <span>{x.album.name}</span>
                <span>{x.album.artists[0].name}</span>
                <a
                  rel="noreferrer"
                  href={x.album.external_urls.spotify}
                  target="_blank"
                >
                  listen
                </a>
                <span>{Math.floor((x.duration_ms % 3600) / 60)}</span>
              </div>
            );
          })}
    </div>
  );
};

export default App;
