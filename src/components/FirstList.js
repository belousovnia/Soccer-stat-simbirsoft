import React,{useState} from 'react'
import TeamList from './TeamList';

function FirstList(props){

  const [radio, setRadio] = useState("0");

  function search() {
    const strSearch = document.getElementById("searchBlock").value;
    console.log(strSearch);
  };

  return (
    <div className='firstList'>
      <div 
        className="btn-group btnBlock" 
        role="group" 
        aria-label="Basic radio toggle button group"
        id="radioGroup"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1q"
          autoComplete="off"
          value="0"
          defaultChecked
          onChange={()=>{
            setRadio(0)
          }}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio1q">
          Команды
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2q"
          autoComplete="off"
          onChange={()=>{
            setRadio(1)
          }}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio2q">
          Соревнования
        </label>
      </div>

      <div className="d-flex searchBlock">
        <input
          className="form-control searchLine"
          type="search"
          placeholder=""
          aria-label="Search"
          id="searchBlock"
        />
        <button 
          type="button" 
          className="btn btn-outline-primary btn-sm buttonSearch"
          onClick={() => search()}
        >
          Поиск
        </button>
      </div>

      <TeamList radio={radio}/>
    </div>
  )
};

export default FirstList;