import { useState, useEffect } from "react";
import CountryList from "./services/components/CountryList";
import api from "./services/service";

const App = () => {
  useEffect(() => {
    setLoading(true);
    api
      .getAllCountry()
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {});

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({
    detail: null,
    isShowed: false,
  });

  const filteredCountries = countries.filter((c) => {
    return c?.name?.common.toLowerCase().includes(filter.toLowerCase());
  });

  const showHandler = (e) => {
    const id = e.target.id;
    const detail = countries.find((c) => c.cca2 === id);

    setCountry({
      detail: detail,
      isShowed: true,
    });
  };

  const backHandler = () => {
    setCountry({
      detail: null,
      isShowed: false,
    });
  };

  return loading ? (
    <div>Loading ... </div>
  ) : (
    <div>
      <h2>Countries</h2>
      <div>
        search
        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <CountryList
        countries={filteredCountries}
        showCountry={country}
        showHandler={showHandler}
        backHandler={backHandler}
      />
    </div>
  );
};

export default App;
