import React,{ useState, useMemo } from 'react'
import FirstListTile from './FirstListTile';

function TeamList(props){

  const [list, setList] = useState(null)

  //  Костыль с getkey потому, что с getRandomKey отображения
  // эффекта радиокнопки работает некорректно.

  let key = 0;
  
  function getKey(){
    key++
    return `key${key}`
  }

  const memo = useMemo(() => {
    setList(
      props.radio.map(i => 
        <FirstListTile 
          data={i} 
          show={props.show}
          setId={props.setId}
          key={getKey()}
        />
      )
    )
  }, [props.radio]);

  return (
    <div className="containerListInform">
      <div 
        className="btn-group-vertical listInform"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {list}
      </div>
    </div>
    
  )
};

export default TeamList;