import React,{} from 'react'
import FirstListTile from './FirstListTile';

function TeamList(props){

  return (
    <div className="containerListInform">
      <div 
        className="btn-group-vertical listInform"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {props.radio.map(i => 
        <FirstListTile 
          data={i} 
          show={props.show}
          setId={props.setId}
        />
        )}
      </div>
    </div>
    
  )
};

export default TeamList;