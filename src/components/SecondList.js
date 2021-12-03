import React, { useState } from 'react'
import MatchList from './MatchList';

function SecondList(props){
  const [dateFrom, setDateFrom] = useState('Invalid Date');
  const [dateTo, setDateTo] = useState('Invalid Date');

  function typeMatch(){
    if (props.radio == 0){
      return "Список матчей команды"
    }else if (props.radio == 1) {
      return "Список матчей соревнования"
    }
  };

  function dateSetting() {
    let dateFrom = new Date(document.getElementById('dateFrom').value);  
    let dateTo = new Date(document.getElementById('dateTo').value);  
    
    if (dateFrom > dateTo){
      alert('Неправильный временной промежуток')
      return
    };

    if (dateFrom != 'Invalid Date' && dateTo != 'Invalid Date'){
      setDateFrom(dateFrom);
      setDateTo(dateTo);
      return
    };

    if ((dateFrom != 'Invalid Date' || dateTo != 'Invalid Date')){
      alert('Нужно установить обе даты');
      return
    };
    
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  };

  return (
    <div className='secondList'>
      <div>
      <div 
        className="typeMatch"
        id="typeMatch"
      >
        {typeMatch()}
      </div>
      <div className="toolBar">
        <div
          className="filter"
        >
          <div className="containerSearch">
            <div className="met">c:</div> 
            <input type="date" className="dateInput" id="dateFrom"/>
          </div>
          <div className="containerSearch">
            <div className="met">по:</div>
            <input type="date" className="dateInput" id="dateTo"/>
          </div>

          <div className="containerSearch">
            <button 
            type="button" 
            className="btn btn-outline-primary"
            onClick={() => dateSetting()}
            >
              Отфильтровать
            </button>
          </div>
        </div>
      </div>
      </div>
      
      <MatchList
        getRandomKey={props.getRandomKey}
        radio={props.radio}
        id={props.id}
        dateFrom={dateFrom}
        dateTo={dateTo}
        rCompetitionsMatches={props.rCompetitionsMatches}
        rTeamsMatches={props.rTeamsMatches}
      />
    </div>
  )
};

export default SecondList;