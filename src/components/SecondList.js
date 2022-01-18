import React, { useState, useEffect } from 'react'
import MatchList from './MatchList';

function SecondList(props){

  let defaultNameSecondList;
  if (sessionStorage.nameSecondList == undefined){
    defaultNameSecondList = 'Выберите команду или соревнование';
  }else{
    defaultNameSecondList = sessionStorage.nameSecondList;
  };

  const [nameSecondListChange, setNameSecondListChange] = 
    useState(defaultNameSecondList);

  let storageDateFrom = sessionStorage.dateFrom;
  let storageDateTo = sessionStorage.dateTo;
  let formDateFrom = '';
  let formDateTo = '';
  
  if (storageDateFrom == undefined || storageDateTo == undefined) {
    storageDateFrom = 'Invalid Date';
    storageDateTo = 'Invalid Date';   
  }else{
    storageDateFrom = new Date(Number(storageDateFrom));
    storageDateTo = new Date(Number(storageDateTo));

    let yearFrom = storageDateFrom.getFullYear();
    let monthFrom = storageDateFrom.getMonth()+1;
    if (monthFrom < 10) {
      monthFrom = `0${monthFrom}`;
    };
    let dayFrom = storageDateFrom.getDate();
    if (dayFrom < 10) {
      dayFrom = `0${dayFrom}`;
    };

    let yearTo = storageDateTo.getFullYear();
    let monthTo = storageDateTo.getMonth()+1;
    if (monthTo < 10) {
      monthTo = `0${monthTo}`;
    };
    let dayTo = storageDateTo.getDate();
    if (dayTo < 10) {
      dayTo = `0${dayTo}`;
    };

    formDateFrom = `${yearFrom}-${monthFrom}-${dayFrom}`;
    formDateTo = `${yearTo}-${monthTo}-${dayTo}`;
  };

  useEffect(() => {
    document.getElementById('dateFrom')
      .setAttribute('value', formDateFrom);
    document.getElementById('dateTo')
      .setAttribute('value', formDateTo);
  }, []);

  //-----------------------------------------------------------------

  const [dateFrom, setDateFrom] = useState(storageDateFrom);
  const [dateTo, setDateTo] = useState(storageDateTo);
  
  // Сохраняет фильтр по дате.
  function dateSetting() {
    let dateFrom = new Date(document.getElementById('dateFrom').value);  
    let dateTo = new Date(document.getElementById('dateTo').value);  
    
    sessionStorage.setItem('dateFrom', dateFrom.getTime());
    sessionStorage.setItem('dateTo', dateTo.getTime());

    if (dateFrom > dateTo){
      alert('Неправильный временной промежуток');
      return;
    };

    if (dateFrom != 'Invalid Date' && dateTo != 'Invalid Date'){
      setDateFrom(dateFrom);
      setDateTo(dateTo);
      document.getElementById('matchList').scrollTop=0;
      return;
    };

    if ((dateFrom != 'Invalid Date' || dateTo != 'Invalid Date')){
      alert('Нужно установить обе даты');
      return;
    };
    
    setDateFrom(dateFrom);
    setDateTo(dateTo);
    document.getElementById('matchList').scrollTop=0;
  };

  // Сброс фильтра по дате.
  function dateSettingDefault() {
    sessionStorage.setItem('dateFrom', 'Invalid Date');
    sessionStorage.setItem('dateTo', 'Invalid Date');
    document.getElementById('dateFrom').value = 'Invalid Date';
    document.getElementById('dateTo').value = 'Invalid Date';
    dateSetting();
  };

  return (
    <div className='secondList'>
      <div>
      <div 
        className="typeMatch"
        id="typeMatch"
      >
        {nameSecondListChange}
      </div>
      <div className="toolBar">
        <div
          className="filter"
        >
          <div className="containerSearch">
            <div className="met">c:</div> 
            <input 
              type="date" 
              className="dateInput" 
              id="dateFrom"
            />
          </div>
          <div className="containerSearch">
            <div className="met">по:</div>
            <input 
              type="date" 
              className="dateInput" 
              id="dateTo"
            />
          </div>

          <div className="containerSearch btnSearch">
            <button 
            type="button" 
            className="btn btn-outline-primary"
            onClick={() => dateSetting()}
            >
              Отфильтровать
            </button>
              <button 
                type="button" 
                className="buttonDanger btn btn-outline-danger"
                onClick={() => dateSettingDefault()}
                >
                  Сброс
              </button>
            
          </div>
        </div>
      </div>
      </div>
      
      <MatchList
        getRandomKey = {props.getRandomKey}
        radioSaved = {props.radioSaved}
        id = {props.id}
        dateFrom = {dateFrom}
        dateTo = {dateTo}
        rCompetitionsMatches = {props.rCompetitionsMatches}
        rTeamsMatches = {props.rTeamsMatches}
        nameSecondList = {props.nameSecondList}
        setNameSecondListChange = {setNameSecondListChange}
      />
    </div>
  );
};

export default SecondList;