import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [randomMusic, setRamdomMusic] = useState([]);
  const [randomButtom, setRandomButtom] = useState(false);

  useEffect(() => {
    const getRandomSongs = async () => {
      try {
        const response = await axios.get(
          "https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/random"
        );
        setRamdomMusic(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    getRandomSongs();
  }, [randomButtom]);

  return (
    <div>
      <button onClick={() => setRandomButtom(!randomButtom)}>random</button>
      {randomMusic.length &&
        randomMusic.map((x) => {
          return (
            <div key={x.id}>
              <img src={x.album.images[2].url} alt={x.album.name} />
              <span>{x.album.name}</span>
              <span>{x.artists[0].name}</span>
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
