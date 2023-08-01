import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import React from "react";


const Country = ({ numberWithCommas, getCountryName }) => {
  const countryName = useParams();
  const { data, loading } = useFetch(
    `https://restcountries.com/v2/name/${countryName.countryName}?fullText=true`
  );
  const [country, setCountry] = useState(data);
  useEffect(() => {
    setCountry(data);
  }, [data]);
  return (
    <div className="countryPage">
      {loading && <h1 className="loading">Loading ...</h1>}
      <div className="container">
        <div className="back">
          <Link to="/">
            Back
          </Link>
        </div>
      </div>
      {country.length === 1 && (
        <div className="country">
          <div className="container">
            <div className="flag">
              <img src={country[0].flag} alt={country[0].name} />
            </div>
            <div className="countryInfo">
              <div className="name">
                <h1>{country[0].name}</h1>
              </div>
              <div className="generalInfo">
                <div className="geoInfo">
                  {country[0].nativeName && (
                    <div>
                      <h3>native name:</h3>
                      {country[0].nativeName}
                    </div>
                  )}
                  <div>
                    <h3>population:</h3>
                    {numberWithCommas(country[0].population)}
                  </div>
                  {country[0].region && (
                    <div>
                      <h3>region:</h3>
                      {country[0].region}
                    </div>
                  )}
                  {country[0].subregion && (
                    <div>
                      <h3>sub region:</h3>
                      {country[0].subregion}
                    </div>
                  )}
                  {country[0].capital && (
                    <div>
                      <h3>capital:</h3>
                      {country[0].capital}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!country.length && (
        <h1 className={loading ? "x" : "loading"}>Page not found</h1>
      )}
    </div>
  );
};
export default Country;
