import React,{useEffect} from 'react'

function FirstListTile(props){

  // Активирует выбранную команду/соревнование.
  function checkId() {
    if (props.data.id == sessionStorage.id) {
      document.getElementById(`btnradio${props.data.id}`)
      .setAttribute('checked', 'checked');
    };
  };

  useEffect(() => {
    checkId();
  }, []);
  
  return (
    <div className="labelBatton" >
      <input 
        type="radio"
        className="btn-check"
        name="btnradio2"
        autoComplete="off"
        id={`btnradio${props.data.id}`}
        key={`a${props.data.id}`}
      />
      <label 
        className="btn btn-outline-primary label"
        htmlFor={`btnradio${props.data.id}`}
        key={`b${props.data.id}`}
        onClick={() => {
          props.show();
          props.setId(props.data.id);
          props.setNameSecondList(props.data.name);
          props.setRadioSaved(props.radio);
          document.getElementById('matchList').scrollTop=0;
        }}
      >
        <img src={props.data.logo} className="logoItem"/>
        <p className="nameItem">{props.data.name}</p>
        <div className="logoItem shadowLogo"/>
      </label>
    </div>
  );
};

export default FirstListTile;