import React,{} from 'react'

function MatchTile(props){

  // Если выбрана команды то добавляет строчку с соревнованием.
  function competition() {
    if (props.radioSaved == '0') {
      return (
        <div className='competitionLine'>
          {props.dataMatch.competition.name}       
        </div>
      );
    };
  };  

  // Формирует строчку с очками команд. 
  function score()  {
    if (props.dataMatch.status == 'FINISHED'){
      return (
        <div className='score'>
          <div>{props.dataMatch.homeTeam.score}</div>
          :
          <div>{props.dataMatch.awayTeam.score}</div>   
        </div>
      );
    }else{
      return (
        <div className='score'>
          <div>-</div>
          :
          <div>-</div>   
        </div>
      );
    };
  };

  let homeTeamClass = '';
  let awayTeamClass = '';

  if (props.dataMatch.winner == 'HOME_TEAM'){
    homeTeamClass = 'winner';
    awayTeamClass = 'loser';
  }else if (props.dataMatch.winner == 'AWAY_TEAM') {
    homeTeamClass = 'loser';
    awayTeamClass = 'winner';
  }else if (props.dataMatch.winner == 'DRAW'){
    homeTeamClass = 'draw';
    awayTeamClass = 'draw';
  };  
 
  return (
    <div className='matchTile' >
      <div className='informLine'>
        <div className='pDate'>Дата проведения:</div>
        {props.dataMatch.date.substring(0, 10)}
      </div>

      {competition()}

      <div className='teamLine'>
        <div className={'homeTeam ' + homeTeamClass}>
          {props.dataMatch.homeTeam.name}
        </div>
        
        {score()}

        <div className={'awayTeam ' + awayTeamClass}>
          {props.dataMatch.awayTeam.name}
        </div>
      </div>
    </div>
    
  );
};

export default MatchTile;