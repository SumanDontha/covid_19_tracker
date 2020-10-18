import React, { useState, useEffect } from 'react';
import './App.css';

import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'

function App() {
  const [countries, setCountries] = useState([]);
  const [ country, setCountry ] = useState('worldwide')
  const [ countryInfo, setCountryInfo ] = useState({})
  const [ tableData, setTableData ] = useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  },[])

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

          setTableData(data)
          setCountries(countries)
        })
    }
    getCountriesData()
    // The empty array means >>>>> The code inside here will run once, when the component loads and not again
  }, [])

  

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    // console.log(countryCode)
    setCountry(countryCode)

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)

      // All of the data... from the country response
      setCountryInfo(data)
    })
  }

  console.log("COUNTRY INFO >>>>", countryInfo)

  return (
    // BEM naming convention
    <div className="app">

      <div className="app__left">
      <div className="app__header">
      <h1>COIVD - 19 TRACKER</h1>
      <FormControl className="app__dropdown">
         {/* Loop through all the countries and show a drop down list of the options */}
        <Select
          variant="outlined"
          value={country}
          onChange={onCountryChange}
        >
          <MenuItem value="worldwide"> Worldwide </MenuItem>
          {
            countries.map(country => (
            <MenuItem value={country.value}> {country.name}</MenuItem>
            ))
          }
          </Select>
      </FormControl>
      </div>

      <div className="app__stats">
           <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
           <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
           <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      </div>
      {/* Map */}
      <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          {/* Table data */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
           {/* Graph */}
          <h3>Worlwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
