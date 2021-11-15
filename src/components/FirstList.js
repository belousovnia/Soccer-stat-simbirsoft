import React,{useState} from 'react'
import TeamList from './TeamList';

function FirstList(props){
  
  const [pattern, setPattern] = useState(new RegExp(''));

  function buildList() {
    let data = [];
    let dataSort = [];

    if (props.radio == "0"){
      data = JSON.parse(localStorage["teamsList"]) ;
    }else if (props.radio == "1"){
      data = JSON.parse(localStorage["competitionsList"]);
    };

    for (let i = 0; i < data.length; i++){
      if (pattern.test(data[i].name)) {
        dataSort.push(data[i])
      }
    }

    return dataSort
  };

  function search() {
    const strSearch = document.getElementById("searchBlock").value;

    setPattern(new RegExp('\\b'+ strSearch, 'i'))
  };

  return (
    <div 
      className={props.status ? 'firstList active' : 'firstList'}
    >
      <div>
        <div 
        className="btn-group btnBlock" 
        role="group" 
        aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio1"
            id="btnradio1q"
            autoComplete="off"
            value="0"
            defaultChecked
            onChange={()=>{
              props.setRadio(0)
            }}
          />
          <label className="btn btn1 btn-outline-primary" htmlFor="btnradio1q">
            Команды
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio1"
            id="btnradio2q"
            autoComplete="off"
            onChange={()=>{
              props.setRadio(1)
              props.setId(null)
            }}
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio2q">
            Соревнования
          </label>
        </div>

        <div className="searchBlock">
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
      </div>
      

      <TeamList 
        setId={props.setId}
        radio={buildList()}
        show={props.show}
      />
    </div>
  )
};

export default FirstList;