const RandomMusic = ({ randomMusic, filterByDurationButton }) => {
  return (
    <>
      {randomMusic
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
    </>
  );
};

export default RandomMusic;
