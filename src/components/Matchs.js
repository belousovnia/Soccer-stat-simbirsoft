import React, { useEffect } from 'react'
import { useParams, useSearchParams  } from 'react-router-dom';
import MatchList from './MatchList';

function Matchs(props) {

  const [filterParams, setFilterParams] = useSearchParams();
  let dateFromParms = filterParams.get('from') || 'Invalid Date';
  let dateToParms = filterParams.get('to') || 'Invalid Date';

  if (typeof dateFromParms == 'string') {
    dateFromParms = new Date(Number(dateFromParms));
  };
  if (typeof dateToParms == 'string') {
    dateToParms = new Date(Number(dateToParms));
  };

  let formDateFrom = '';
  let formDateTo = '';
  
  if (dateFromParms == 'Invalid Date' || dateToParms == 'Invalid Date') {
    dateFromParms = 'Invalid Date';
    dateToParms = 'Invalid Date';   
  }else{
    dateFromParms = new Date(Number(dateFromParms));
    dateToParms = new Date(Number(dateToParms));

    let yearFrom = dateFromParms.getFullYear();
    let monthFrom = dateFromParms.getMonth()+1;
    if (monthFrom < 10) {
      monthFrom = `0${monthFrom}`;
    };
    let dayFrom = dateFromParms.getDate();
    if (dayFrom < 10) {
      dayFrom = `0${dayFrom}`;
    };

    let yearTo = dateToParms.getFullYear();
    let monthTo = dateToParms.getMonth()+1;
    if (monthTo < 10) {
      monthTo = `0${monthTo}`;
    };
    let dayTo = dateToParms.getDate();
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
  
  // Сохраняет фильтр по дате.
  function dateSetting() {
    let dateFrom = new Date(document.getElementById('dateFrom').value);  
    let dateTo = new Date(document.getElementById('dateTo').value);  

    if (dateFrom > dateTo){
      alert('Неправильный временной промежуток');
      return;
    };

    if (dateFrom != 'Invalid Date' && dateTo != 'Invalid Date'){
      setFilterParams({
          from: dateFrom.getTime(),
          to: dateTo.getTime()
        });
      document.getElementById('matchList').scrollTop=0;
      return;
    };

    if ((dateFrom != 'Invalid Date' || dateTo != 'Invalid Date')){
      alert('Нужно установить обе даты');
      return;
    };
  };

  // Сброс фильтра по дате.
  function dateSettingDefault() {
    document.getElementById('dateFrom').value = 'Invalid Date';
    document.getElementById('dateTo').value = 'Invalid Date';
    setFilterParams({
      from: 'Invalid Date',
      to: 'Invalid Date'
    });
    dateSetting();
    document.getElementById('matchList').scrollTop=0;
  };

  let titleName;
  if (props.type == 0) {
    titleName = 'Матчи команды ';
  } else if (props.type == 1) {
    titleName = 'Матчи соревнования ';
  };


  return (
    <div className='matchList'>
      <div>
      <div 
        className="typeMatch"
        id="typeMatch"
      >
        {titleName}
        {useParams().nameList}
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
              defaultValue={formDateFrom}
            />
          </div>
          <div className="containerSearch">
            <div className="met">по:</div>
            <input 
              type="date" 
              className="dateInput" 
              id="dateTo"
              defaultValue={formDateTo}
            />
          </div>

          <div className="containerSearch btnSearch">
            <button 
            type="button" 
            className="btn btn-outline-primary buttonSearch"
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
        radioSaved = {props.type}
        id = {useParams().id}
        saveName = {useParams().nameList}
        dateFrom = {dateFromParms}
        dateTo = {dateToParms}
        rCompetitionsMatches = {props.rCompetitionsMatches}
        rTeamsMatches = {props.rTeamsMatches}
        nameSecondList = {props.nameSecondList}
      />
    </div>
  );
};

export default Matchs;