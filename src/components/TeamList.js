import React,{ useState, useMemo} from 'react'
import TeamCompetitionTile from './TeamCompetitionTile';

function TeamList(props){

  const [list, setList] = useState(null);

  const memo = useMemo(() => {
    props.buildList().then(response => {
      let data = response.map(i => 
        <TeamCompetitionTile 
          data={i} 
          show={props.show}
          setId={props.setId}
          key={props.getKey()}
          radio={props.radio}
          setRadioSaved={props.setRadioSaved}
          pattern={props.pattern}
          setNameSecondList={props.setNameSecondList}
        />)
        setList(data);
      });
  }, [props.radio, props.pattern]);

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
    
  );
};

export default TeamList;