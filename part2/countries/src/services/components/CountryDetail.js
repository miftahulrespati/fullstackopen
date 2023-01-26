import { useState, useEffect } from "react";
import api from "../../services/service";

const weatherInfo = require("../../others/weather-information.json");

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    api.getWeather(country?.latlng[0], country?.latlng[1]).then((res) => {
      setWeather(res.data);
    });
  }, [country]);

  let langs = [];
  for (let lang in country?.languages) {
    langs.push(country?.languages[lang]);
  }
  const weatherImage = weatherInfo.find(
    (w) => w.code === weather?.current_weather?.weathercode
  );

  return (
    <div>
      <h3>{country?.name?.common}</h3>
      <p>capital {country?.capital[0]}</p>
      <p>
        area {country?.area} km<sup>2</sup>
      </p>
      <h4>languages:</h4>
      <ul>
        {langs?.map((lang) => {
          return <li key={lang}>{lang}</li>;
        })}
      </ul>
      <img src={country?.flags["png"]} alt="flag" width={200} />
      <p>temperature: {weather?.current_weather?.temperature} °C</p>
      <img src={weatherImage?.img} alt={weatherImage?.description} />
      <p>wind speed: {weather?.current_weather?.windspeed}</p>
    </div>
  );
};

export default CountryDetail;
