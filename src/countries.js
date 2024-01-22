import React, { useState, useEffect } from "react";
import axios from "axios";
import bgimg from "./World-Map-PNG-Pic.png"

function Countries() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    const results = data.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  // Add a condition to display only Pakistan data initially
  useEffect(() => {
    const pakistanData = data.filter(
      (country) => country.name.common.toLowerCase() === "pakistan"
    );
    setSearchResults(pakistanData);
  }, [data]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container h-[100vh] w-[100%] " style={{backgroundImage: `url(${bgimg})`}}>
      <div className="flex flex-col justify-center align-middle items-center gap-y-10 font-bold">
        <div className="flex flex-row justify-around w-[100%] bg-gradient-to-r from-purple-500 to-pink-500"><h1 className="text-6xl text-white mx-5">Country Search</h1>
        <input bg-gradient-to-r from-purple-500 to-pink-500
          className="p-5 border-solid border-blue-900 border-2"
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleChange}
        />
        </div>
        <div>
          {searchResults.map((country, index) => (
            <div key={index}>
              <h2 className="text-3xl mb-8  text-white bg-gradient-to-r p-4 rounded-full from-purple-500 to-pink-500">{country.name.common}</h2>
              <div className="flex flex-row gap-5 justify-center items-center mb-8">
                <div className="">
              <img
              className="w-[100%] h-auto border-black border-solid border-2"
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
              />
              </div>
              <div className="bg-white p-5 border-2  border-solid rounded-lg border-black bg-gradient-to-r from-purple-500 to-pink-500">
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <p>Area: {country.area}</p>
              <p>Language: {country.language}</p>
              <p>Independent: {country.independent ? "Yes" : "No"}</p>
              <p>Status: {country.status}</p>
              <p>UN Member: {country.unMember ? "Yes" : "No"}</p>
              <p>Currencies:</p>
              
              <ul>
                {Object.entries(country.currencies || {}).map(
                  ([currencyCode, currencyInfo]) => (
                    <li key={currencyCode}>
                      {currencyInfo.name} ({currencyInfo.symbol})
                    </li>
                  )
                )}
              </ul>
              <p>Start of Week: {country.startOfWeek}</p>
              {country.postalCode && (
                <div>
                  <p>Postal Code Format: {country.postalCode.format}</p>
                  <p>Postal Code Regex: {country.postalCode.regex}</p>
                </div>
              )}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Countries;
