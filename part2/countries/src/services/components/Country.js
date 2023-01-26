const Country = ({ country, showHandler }) => {
  return (
    <li>
      {country?.name?.common}{" "}
      <button onClick={showHandler} id={country?.cca2}>
        show
      </button>
    </li>
  );
};

export default Country;
