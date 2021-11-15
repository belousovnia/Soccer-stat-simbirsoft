import React, { useState, useMemo } from 'react'
import * as fun from '../fun'
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
      dataMatches = await fun.rTeamsMatches(props.id);
      sessionStorage.setItem('dataMatches', JSON.stringify(dataMatches));
      sessionStorage.setItem('radio', props.radio);
      sessionStorage.setItem('id', props.id);
    } else if (props.radio == 1) {
      dataMatches = await fun.rCompetitionsMatches(props.id);
      sessionStorage.setItem('dataMatches', JSON.stringify(dataMatches));
      sessionStorage.setItem('radio', props.radio);
      sessionStorage.setItem('id', props.id);
    };

    return dataMatches
  };

  function matchFilter(dataMatches, dateFrom, dateTo) {
    if (dataMatches == null) return;

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

    setMatches(() => {return listMatches})
  };

  const memo = useMemo(() => getListMatches().then(res => {
    matchFilter(res, props.dateFrom, props.dateTo);
  }), 
    [props.id, props.dateTo, props.dateFrom])

  // getListMatches().then(res => console.log(listBuilder(
  //   res, props.dateFrom, props.dateTo))) ;

  console.log(matches);

  return (
    <div className='containerMatchList'>
      <div className='matchList'>
        {matches.map((i) => <MatchTile dataMatch={i}/>)}
      </div>
    </div>
    
  )
};

export default MatchList;