import React, { useState } from 'react'
import FirstList from './components/FirstList'
import SecondList from './components/SecondList'
import * as fun from './fun'

function App() {

  // fun.rTeamsMatches(355).then((response) => {console.log(response)});
  // fun.rCompetitionsMatches(2015).then((response) => {console.log(response)});

  if (localStorage["teamsList"] == undefined || localStorage["competitionsList"] == undefined) {
     fun.saveLocalStorege();;
  };
 
  return (
    <div className="App">
      <FirstList/>
      <SecondList/>
    </div>
  );
}

export default App;
