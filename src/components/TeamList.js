import React,{} from 'react'
import FirstListTile from './FirstListTile';

function TeamList(props){
  
  function buildList(radio) {
    let data = [];

    if (radio == "0"){
      data = JSON.parse(localStorage["teamsList"]) ;
    }else if (radio == "1"){
      data = JSON.parse(localStorage["competitionsList"]);
    };

    return data
  };

  return (
    <div className="containerListInform">
      <div 
        className="btn-group-vertical listInform"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {buildList(props.radio).map(i => <FirstListTile data={i}/>)}
      </div>
    </div>
    
  )
};

export default TeamList;