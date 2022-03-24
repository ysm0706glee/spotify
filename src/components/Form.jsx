const Form = ({
  setSearchWord,
  setIsFocused,
  handleSearch,
  isFocused,
  history,
  handleHistory,
}) => {
  return (
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
  );
};

export default Form;
