import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;

const CountriesList = ({ countries, showOneCountrie }) => {
  return (
    <div>
      {countries.map((country, index) => (
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={() => showOneCountrie(index)}>show</button>
        </p>
      ))}
    </div>
  );
};

const Countrie = ({ country }) => {
  let lengauges = Object.values(country.languages);
  let imgSrc = country.flags.png;
  let imgAlt = country.flags.alt;

  const lat = country.latlng[0];
  const lon = country.latlng[1];

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <ul>
        {lengauges.map((leng, i) => (
          <li key={i}>{leng}</li>
        ))}
      </ul>
      <img src={imgSrc} alt={imgAlt} />
      <Weather lat={lat} lon={lon} />
    </div>
  );
};
const Weather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, [lat, lon]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((countries) => setAllCountries(countries));
  }, []);
  useEffect(() => {
    const filterCountries = () => {
      const filtered = allCountries.filter((country) => {
        const name = country.name.common.toLowerCase();
        return name.includes(searchQuery.toLowerCase());
      });
      setFilteredCountries(filtered);
    };
    filterCountries();
  }, [allCountries, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const showOneCountrie = (index) => {
    setFilteredCountries(filteredCountries.filter((c, i) => i === index));
  };

  return (
    <div>
      Find countries{" "}
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      {filteredCountries.length <= 10 ? (
        filteredCountries.length === 1 ? (
          <Countrie country={filteredCountries[0]} />
        ) : (
          <CountriesList
            countries={filteredCountries}
            showOneCountrie={showOneCountrie}
          />
        )
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
