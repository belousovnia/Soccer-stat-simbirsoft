import React, { useState, useMemo } from 'react'
import MatchTile from './MatchTile';

function MatchList(props){

  const [matches, setMatches] = useState([]);

  function dataSave(data) {
    console.log(data);
    if (data == 'errorLimit'){
      alert(
        'Вы привысили предельно допустимое количество запросов в минуту. Подождите 1 минуту, затем повторите попытку.'
      );
    } else {
      sessionStorage.setItem('dataMatches', JSON.stringify(data));
      sessionStorage.setItem('radioSaved', props.radioSaved);
      sessionStorage.setItem('id', props.id);
      props.setNameSecondListChange(props.nameSecondList);
      sessionStorage.setItem('nameSecondList', props.nameSecondList);
    };
  };

  async function getListMatches() {
    let dataMatches = 'error';

    if (props.id == null) {

      return null;
      
    } else if (sessionStorage.radioSaved == props.radioSaved && 
      sessionStorage.id == props.id) {
        
      dataMatches = JSON.parse(sessionStorage['dataMatches']); 

    } else if (props.radioSaved == 0) {

      dataMatches = await props.rTeamsMatches(props.id);
      dataSave(dataMatches);

    } else if (props.radioSaved == 1) {

      dataMatches = await props.rCompetitionsMatches(props.id);
      dataSave(dataMatches);

    };

    return dataMatches;
  };

  // ------------------------------------------------------

  function matchFilter(dataMatches, dateFrom, dateTo) {

    if (dataMatches == null) {
      setMatches([]);
      return;
    }else if (dataMatches == 'errorLimit') {
      return;
    };
    
    let listMatches = [];

    if(dateFrom == 'Invalid Date') {
      listMatches = dataMatches;
    } else if(dateTo == 'Invalid Date') {
      listMatches = dataMatches;
    } else {
      for (let i = 0; i < dataMatches.length; i++) {
        const date = new Date(dataMatches[i].date);

        if (date.getTime() > dateFrom.getTime()) {
          if (date.getTime() < dateTo.getTime()) {
            listMatches.push(dataMatches[i]);
          };
        };
      };
    };

    if (listMatches.length == 0){
      setMatches(
        <div className='matchAlert'>
          Нет информации по матчам
        </div>
      );
    }else{
      setMatches(
        listMatches.map((i) => <MatchTile
          key={props.getRandomKey()} 
          dataMatch={i}
          radioSaved={props.radioSaved}
          getRandomKey={props.getRandomKey}
        />)
      );
    };
  };

  // ------------------------------------------------------

  const memo = useMemo(() => {
    getListMatches().then(res => {
      matchFilter(res, props.dateFrom, props.dateTo);
    }); 
  }, [props.id, props.radioSaved, props.dateTo, props.dateFrom]);

  return (
    <div className='containerMatchList' id='matchList'>
      <div className='matchList'>
        {matches}
      </div>
    </div>
    
  );
};

export default MatchList;