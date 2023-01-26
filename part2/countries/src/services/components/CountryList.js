import Country from "./Country";
import CountryDetail from "./CountryDetail";

const CountryList = ({
  countries,
  weather,
  showCountry,
  showHandler,
  backHandler,
}) => {
  return countries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : countries.length === 1 || showCountry.isShowed ? (
    <div>
      {showCountry.detail && <button onClick={backHandler}>back</button>}
      <CountryDetail
        country={showCountry.detail ?? countries[0]}
        weather={weather}
      />
    </div>
  ) : countries.length > 1 ? (
    <ul>
      {countries.map((country) => {
        return (
          <Country
            key={country.cca2}
            country={country}
            showHandler={showHandler}
          />
        );
      })}
    </ul>
  ) : (
    <p>No country found</p>
  );
};

export default CountryList;
