import React, { useState, useEffect } from 'react';
import './App.css';

import { FormControl, Select, MenuItem } from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([]);
  const [ country, setCountry ] = useState('Worldwide')

  // USEEFFECT >>>> Runs a piece of code based on the given condition
  // https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    // async >>> Send a request, wait for it, do something for info

    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // United States, United Kingdom,....
              value: country.countryInfo.iso2 // UK, USA, FR
            }
          ))
          setCountries(countries)
        })
    }
    getCountriesData()
    // The empty array means >>>>> The code inside here will run once, when the component loads and not again
  }, [])

  

  const onCountryChange = (event) => {
    const countryCode = event.target.value
    // console.log(countryCode)
    setCountry(countryCode)
  }

  return (
    // BEM naming convention
    <div className="app">

      <div className="app__header">
      <h1>COIVD - 19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={country}
          onChange={onCountryChange}
        >
          <MenuItem value="Worldwide"> Worldwide </MenuItem>
          {
            countries.map(country => (
            <MenuItem value={country.value}> {country.name}</MenuItem>
            ))
          }

          {/* Loop through all the countries and show a drop down list of the options */}
          {/* <MenuItem value="Worldwide"> Worldwide </MenuItem>
          <MenuItem value="Worldwide"> Worldwide </MenuItem>
          <MenuItem value="Worldwide"> Worldwide </MenuItem>
          <MenuItem value="Worldwide"> Worldwide </MenuItem> */}

          </Select>
      </FormControl>
      </div>

      {/* Header ( Title + select input dropdown)  */}

      {/* Info box's (three) */}

      {/* Table data */}
      {/* Graph */}

      {/* Map */}

    </div>
  );
}

export default App;
