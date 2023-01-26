import axios from "axios";
const countryUrl = "https://restcountries.com/v3.1";
const weatherUrl = "https://api.open-meteo.com/v1";

const getAllCountry = async () => {
  return await axios.get(`${countryUrl}/all`);
};

const getWeather = async (lat, long) => {
  return await axios.get(
    `${weatherUrl}/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
  );
};

const service = { getAllCountry, getWeather };

export default service;
