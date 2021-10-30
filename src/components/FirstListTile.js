import React from 'react'

function FirstListTile(props){

  return (
    <>
      <input 
        type="radio"
        className="btn-check"
        name="btnradio"
        autoComplete="off"
        id={`btnradio${props.data.id}`}
        key={`a${props.data.id}`}
      />
      <label 
        className="btn btn-outline-primary label"
        htmlFor={`btnradio${props.data.id}`}
        key={`b${props.data.id}`}
      >
        <img src={props.data.logo} className="logoItem"/>
        <p className="nameItem">{props.data.name}</p>
        <div className="logoItem shadowLogo"/>
      </label>
    </>
  )
};

export default FirstListTile;