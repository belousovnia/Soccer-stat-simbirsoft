import React, { useState, useRef } from 'react'
import FirstList from './components/FirstList'
import SecondList from './components/SecondList'
import { apiKey } from './apiKey';

function App() {

  const secret = apiKey;

  let storageRadio = sessionStorage.radio;
  if (storageRadio == undefined) {storageRadio = 0};
  let storageRadioSaved = sessionStorage.radioSaved;
  
  
  const [statusFirstList, setStatusFirstList] = useState(true);
  const [radio, setRadio] = useState(storageRadio);
  const [radioSaved, setRadioSaved] = useState(storageRadioSaved); 
  const [id, setId] = useState(sessionStorage.id);
  const [nameSecondList, setNameSecondList] = useState();
  const countNewKey = useRef(0);
 
  // ----------------------------------------------------------------

  //  Возвращает уникально число. Используется для раздачи уникальных 
  // ключей.
  function getRandomKey() {
    countNewKey.current++;
    return countNewKey.current;
  };

  //  Меняет тип отображения первого блока.
  function show() {
    setStatusFirstList(!statusFirstList);
  };
 
  // Векторная стрелочка для кнопки раскрытия.
  function arrow() {
    if (statusFirstList) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          className="bi bi-arrow-bar-left"
          viewBox="0 0 16 16"
          className="arrow"
        >
          <path
            fillRule="evenodd"
            d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          className="bi bi-arrow-bar-right"
          viewBox="0 0 16 16"
          className="arrow"
        >
          <path
            fillRule="evenodd"
            d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
          />
        </svg>
      );
    };
  };

  // ----------------------------------------------------------------
  // Функции для работы с внешним api.

  //  Запрос списка соревнаваний. Возвращает список соревнаваний
  // в виде объекта с именем, id и эмблемой соревнавания.
  async function rCompetitions(){

    let data = await fetch('https://api.football-data.org/v2/competitions?plan=TIER_ONE', {
      headers: {'X-Auth-Token': secret,}
    }).then((response) => {
      return response.json();
    });

    data = data.competitions
    const returnData = [];
    let iLogo;

    for (let i =0; i < data.length; i++){
      if (data[i].emblemUrl != null){
        iLogo = data[i].emblemUrl;
      }else if(data[i].area.ensignUrl != null){
        iLogo = data[i].area.ensignUrl;
      }else{
        iLogo = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg';
      };
        
      const iCompetition = {
        name: data[i].name,
        id: data[i].id,
        logo: iLogo,
      };

      returnData.push(iCompetition);
    };

    return returnData;
  };

  //  Запрос списка комманд. Возвращает список со всеми 
  // командами в виде объектов с именем, id и эмблемой.

  async function rTeams(){
    
    let data = await fetch('https://api.football-data.org/v2/teams?plan=TIER_ONE', {
      headers: {'X-Auth-Token': secret,}
    }).then((response) => {
      return response.json();
    });
    
    data = data.teams;
    const returnData = [];

    for (let i =0; i < data.length; i++){
      const iTeam = {
        name: data[i].name,
        id: data[i].id,
        logo: data[i].crestUrl,
      };

      returnData.push(iTeam);
    };

    return returnData;
  }

  // Запрос матчей команды.
  // Принимает id команды, возвращает массив.

  async function rTeamsMatches(id){
    
    let data;
    let returnData = [];

    try {
      data = await fetch(
        `https://api.football-data.org/v2/teams/${id}/matches`, 
      {
        headers: {'X-Auth-Token': secret,}
      }).then((response) => {
        return response.json();
      });
    }catch (e){
      returnData = 'errorLimit';
      return returnData;
    };  

    data = data.matches;
    
    for (let i =0; i < data.length; i++){
      const iMatch = {
        status: data[i].status,
        date: data[i].utcDate,
        winner: data[i].score.winner,
        competition: {
          name: data[i].competition.name,
          id: data[i].competition.id,
        }, 
        homeTeam: {
          name: data[i].homeTeam.name,
          id: data[i].homeTeam.id,
          score: data[i].score.fullTime.homeTeam + 
            data[i].score.extraTime.homeTeam + 
            data[i].score.penalties.homeTeam,
        },
        awayTeam: {
          name: data[i].awayTeam.name,
          id: data[i].awayTeam.id,
          score: data[i].score.fullTime.awayTeam +  
            data[i].score.extraTime.awayTeam + 
            data[i].score.penalties.awayTeam,
        },
      };

      returnData.push(iMatch);
    };

    return returnData;
  };

  // Запрос матчей соревнования.
  // Принимает id соревнования, возвращает массив объектов.

  async function rCompetitionsMatches(id){

    let data;
    let returnData = [];

    try {
      data = await fetch(
        `https://api.football-data.org/v2/competitions/${id}/matches`, {
        headers: {'X-Auth-Token': secret,}
      }).then((response) => {
        return response.json();
      });
    }catch (e){
      returnData = 'errorLimit';
      return returnData;
    };  

    data = data.matches;
    

    for (let i =0; i < data.length; i++){
      const iMatch = {
        status: data[i].status,
        date: data[i].utcDate,
        winner: data[i].score.winner,
        competition: {
          name: null,
          id: null,
        },  
        homeTeam: {
          name: data[i].homeTeam.name,
          id: data[i].homeTeam.id,
          score: data[i].score.fullTime.homeTeam + 
            data[i].score.extraTime.homeTeam + 
            data[i].score.penalties.homeTeam,
        },
        awayTeam: {
          name: data[i].awayTeam.name,
          id: data[i].awayTeam.id,
          score: data[i].score.fullTime.awayTeam + 
            data[i].score.extraTime.awayTeam + 
            data[i].score.penalties.awayTeam,
        },
      };
      
      returnData.push(iMatch);
    };

    return returnData;
  };

  // ----------------------------------------------------------------

  //  Возвращает и обновляет данные в локальном хранилище, список 
  // команд и список соревнований.

  async function getPrimaryData() {

    let teamsList;
    let competitionsList;
    let timePassed;
    let dataUpdateDate;
    let dataNow = new Date().getTime();

    if (localStorage.dataUpdateDate == undefined) {
      timePassed = 864000001;
    } else {
      dataUpdateDate = new Date(
        Number(localStorage.dataUpdateDate)).getTime();
      timePassed = dataNow - dataUpdateDate;
    };

    if (localStorage["teamsList"] == undefined || 
    localStorage["competitionsList"] == undefined ||
    timePassed > 86400000) {

      teamsList = await rTeams();
      competitionsList = await rCompetitions();

      localStorage.setItem("teamsList", 
        JSON.stringify(teamsList));
      localStorage.setItem("competitionsList", 
        JSON.stringify(competitionsList));
      
      localStorage.setItem('dataUpdateDate', dataNow);

    } else {

      teamsList = JSON.parse(localStorage["teamsList"]) ;
      competitionsList = JSON.parse(localStorage["competitionsList"]);
    
    };

    if (radio == "0"){
      return teamsList;
    }else if (radio == "1"){
      return competitionsList;
    };
  };

  
  // ----------------------------------------------------------------

  return (
    <div className="app">
      <FirstList 
        radio={radio}
        setId={setId}
        setRadio={setRadio}
        setRadioSaved={setRadioSaved}
        status={statusFirstList} 
        show={show}
        getPrimaryData={getPrimaryData}
        setNameSecondList={setNameSecondList}
      />

      <button 
        type="button" 
        className={statusFirstList ? 'btn btn-outline-primary showBtn active' :
        'btn btn-outline-primary showBtn'
        }
        onClick={() => show()}
      >
      {arrow()}
      </button>

      <SecondList 
        radioSaved = {radioSaved}
        id = {id}
        getRandomKey = {getRandomKey}
        rTeamsMatches = {rTeamsMatches}
        rCompetitionsMatches = {rCompetitionsMatches}
        nameSecondList = {nameSecondList}
      />
    </div>
  );
};

export default App;
