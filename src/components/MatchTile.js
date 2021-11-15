import React,{} from 'react'

function MatchTile(props){

  console.log('yes');

  return (
    <div className='matchTile'>
      {props.dataMatch.date}
    </div>
    
  )
};

export default MatchTile;