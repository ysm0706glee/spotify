import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [randomMusic, setRamdomMusic] = useState([]);
  const [randomButton, setRandomButton] = useState(false);

  const [searchWord, setSearchWord] = useState("");
  const [searchMusic, setSearchMusic] = useState([]);

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
      } catch (error) {
        console.error(error);
      }
    };
    setRamdomMusic([]);
    getSearchMusic();
  };

  return (
    <div>
      <form>
        <input type="text" onChange={(e) => setSearchWord(e.target.value)} />
        <button onClick={(e) => handleSearch(e)}>search</button>
      </form>

      <button onClick={() => setRandomButton(!randomButton)}>random</button>

      {randomMusic.length &&
        randomMusic.map((x) => {
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
            </div>
          );
        })}

      {searchMusic.length &&
        searchMusic.map((x) => {
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
            </div>
          );
        })}
    </div>
  );
};

export default App;
