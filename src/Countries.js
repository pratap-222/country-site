import React from "react";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
let url;
const Countries = ({numberWithCommas }) => {

  const { data, loading } = useFetch(url);
  const [countries, setCountries] = useState([]);
  const [inputField , setInputField ] = useState(undefined);
  const [search,setSearch] = useState(undefined);
  const [filtra,setFilter] = useState("All");

  url = search
    ? `https://restcountries.com/v2/name/${search}`
    : "https://restcountries.com/v2/all";

  useEffect(() => {
    if (search) {
      setCountries(data);
    } else {
      if (filtra === "All") setCountries(data);
      else {
        setCountries(
          data.filter((country) => {
            return country.region === filtra;
          })
        );
      }
    }
  }, [search, data, filtra]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputField);
}
const handleSelect = (e) => {
  setFilter(e.target.value)
  setSearch(undefined);
  setInputField('');
}

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="inputField">
            <input
              type="search"
              placeholder="Search for a country..."
              value={inputField}
              onChange={(e) => {
                setInputField(e.target.value);
                setSearch(e.target.value);
              }}
            />
          </div>
          <select id="region" name="region" onChange={handleSelect}>
            <option value="All" defaultValue>
              All
            </option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </form>
      </div>

      <div className="countriesList">
        <div className="container">
          {loading && <h1 className="loading">Loading ...</h1>}
          {countries.length ? (
            countries.map((country) => {
              const { flag, name, population, region, capital } = country;
              return (
                <Link to={`/${name}`} className="listItem" key={name}>
                  <img src={flag} alt={name} />
                  <div className="info">
                    <h2>{name}</h2>
                    <div>
                      <h3>population:</h3>
                      <span>{numberWithCommas(population)}</span>
                    </div>
                    {region && (
                      <div>
                        <h3>region:</h3>
                        <span>{region}</span>
                      </div>
                    )}
                    {capital && (
                      <div>
                        <h3>capital:</h3>
                        <span>{capital}</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <h1 className={loading ? "x" : "loading"} style={{ left: "35%" }}>
              There is no result for your search
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Countries;
