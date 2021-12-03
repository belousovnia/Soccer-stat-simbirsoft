import React, { useState, useMemo } from 'react'
import MatchTile from './MatchTile';

function MatchList(props){

  const [matches, setMatches] = useState([])

  async function getListMatches() {
    let dataMatches = 'error';
    

    if (props.id == null) {
      return null
    } else if (sessionStorage.radio == props.radio && 
      sessionStorage.id == props.id) {
        
      dataMatches = JSON.parse(sessionStorage['dataMatches']); 
      console.log('Данные взяты из хранилища сессии');

    } else if (props.radio == 0) {

      console.log('Запрос!!!'); // Удалить!!!
      dataMatches = await props.rTeamsMatches(props.id);
      sessionStorage.setItem('dataMatches', JSON.stringify(dataMatches));
      sessionStorage.setItem('radio', props.radio);
      sessionStorage.setItem('id', props.id);

    } else if (props.radio == 1) {

      console.log('Запрос!!!'); // Удалить!!!
      dataMatches = await props.rCompetitionsMatches(props.id);
      sessionStorage.setItem('dataMatches', JSON.stringify(dataMatches));
      sessionStorage.setItem('radio', props.radio);
      sessionStorage.setItem('id', props.id);

    };

    return dataMatches
  };

  // ------------------------------------------------------

  function matchFilter(dataMatches, dateFrom, dateTo) {

    if (dataMatches == null) {
      setMatches([])
      return
    };

    let listMatches = [];

    if(dateFrom == 'Invalid Date') {
      setMatches(() => {return dataMatches});
      return
    };
    if(dateTo == 'Invalid Date') {
      setMatches(() => {return dataMatches});
      return
    };

    for (let i = 0; i < dataMatches.length; i++) {
      const date = new Date(dataMatches[i].date)

      if (date.getTime() > dateFrom.getTime()) {
        if (date.getTime() < dateTo.getTime()) {
          listMatches.push(dataMatches[i])
        }
      }
    };

    setMatches(() => {return listMatches});
  };

  // ------------------------------------------------------

  function checkMatchLength(){
    if (matches.length == 0){
      return (
        <div className='matchAlert'>
          Нет информации по матчам
        </div>
      )
    }else{
      return(
        matches.map((i) => <MatchTile
        key={props.getRandomKey()} 
        dataMatch={i}
        radio={props.radio}
        getRandomKey={props.getRandomKey}
        />)
      )
    };
  };

  const memo = useMemo(() => {
    console.log(1);
    getListMatches().then(res => {
      matchFilter(res, props.dateFrom, props.dateTo);
      console.log(2);
    })
  }, [props.id, props.radio, props.dateTo, props.dateFrom]);

  return (
    <div className='containerMatchList'>
      <div className='matchList'>
        {checkMatchLength()}
      </div>
    </div>
    
  )
};

export default MatchList;