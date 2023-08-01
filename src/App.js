import React from 'react';
import Header from './Header'
import Countries from './Countries';
import Country from './Country';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import useFetch from './useFetch';


function App() {
  const {data} = useFetch("https://restcountries.com/v2/all")
  
  const getCountryName = (code) => {
    let countryName;
    const country = data.filter((element)=>{
      return element.alpha3Code === code;
    })  
    countryName = country[0].name
    return countryName;
  }
  const numberWithCommas = ( number => {
    return number
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g,",");
  })
  return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Countries numberWithCommas={numberWithCommas}/>}/>
            <Route path="/:countryName" element={<Country numberWithCommas={numberWithCommas} getCountryName={getCountryName}/>} />
          </Routes>
        </div>
      </Router>
  );
}
export default App;