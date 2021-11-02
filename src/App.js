import React, { useState } from 'react'
import FirstList from './components/FirstList'
import SecondList from './components/SecondList'
import * as fun from './fun'

function App() {

  const [statusFirstList, setStatusFirstList] = useState(false);
  const [radio, setRadio] = useState("0");
  const [id, setId] = useState(null)

  console.log(id);
  console.log(radio);

  if (localStorage["teamsList"] == undefined || localStorage["competitionsList"] == undefined) {
     fun.saveLocalStorege();;
  };

  function show() {
    setStatusFirstList(!statusFirstList)
  };
 
  function arrow() {
    if (statusFirstList) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          className="bi bi-arrow-bar-left"
          viewBox="0 0 16 16"
          className="arrow"
        >
          <path
            fillRule="evenodd"
            d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
      )
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          className="bi bi-arrow-bar-right"
          viewBox="0 0 16 16"
          className="arrow"
        >
          <path
            fillRule="evenodd"
            d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
          />
        </svg>
      )
    }
  };

  return (
    <div className="app">
      <FirstList 
        radio={radio}
        setId={setId}
        setRadio={setRadio}
        status={statusFirstList} 
        show={show}/>
      <button 
        type="button" 
        className={statusFirstList ? 'btn btn-outline-primary showBtn active' :
        'btn btn-outline-primary showBtn'
        }
        onClick={() => show()}
      >
      {arrow()}
      </button>
      <SecondList 
        radio={radio}
        id={id}
      />
    </div>
  );
}

export default App;
