import React, { useRef } from 'react';
import { apiKey } from './apiKey';
import { Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Teams from './components/Teams';
import Competitions from './components/Competitions';
import Matchs from './components/Matchs';

function App() {

  const countNewKey = useRef(0);

  //  Возвращает уникально число. Используется для раздачи уникальных 
  // ключей.
  function getKey() {
    countNewKey.current++;
    return countNewKey.current;
  };

  // ----------------------------------------------------------------
  // Функции для работы с внешним api.

  //  Запрос списка соревнаваний. Возвращает список соревнаваний
  // в виде объекта с именем, id и эмблемой соревнавания.
  async function rCompetitions(){

    let data = await fetch('https://api.football-data.org/v2/competitions?plan=TIER_ONE', {
      headers: {'X-Auth-Token': apiKey,}
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
      headers: {'X-Auth-Token': apiKey,}
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
        headers: {'X-Auth-Token': apiKey,}
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
        headers: {'X-Auth-Token': apiKey,}
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

  async function getPrimaryData(type) {

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

    if (type == "0"){
      return teamsList;
    }else if (type == "1"){
      return competitionsList;
    };
  };

  
  // ----------------------------------------------------------------

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <Link to="Soccer-stat-simbirsoft/" className="headerLink nav-link">Главная</Link>
        <Link to="Soccer-stat-simbirsoft/teams" className="headerLink nav-link">Команды</Link>
        <Link to="Soccer-stat-simbirsoft/competitions" className="headerLink nav-link">Соревнования</Link>
      </nav>

      <Routes>
        <Route path="Soccer-stat-simbirsoft/" element={<Home/>}/>
        <Route path="Soccer-stat-simbirsoft/teams" element={
          <Teams
            getPrimaryData={getPrimaryData}
            getKey={getKey}
          />
        }/>
        <Route path="Soccer-stat-simbirsoft/competitions" element={
          <Competitions
            getPrimaryData={getPrimaryData}
            getKey={getKey}
          />
        }/>
        <Route path="Soccer-stat-simbirsoft/teams/:id/:nameList" element={
          <Matchs
            type={0}
            getKey = {getKey}
            rTeamsMatches = {rTeamsMatches}
            rCompetitionsMatches = {rCompetitionsMatches}
          />
        }/>
        <Route path="Soccer-stat-simbirsoft/competitions/:id/:nameList" element={
          <Matchs
            type={1}
            getKey = {getKey}
            rTeamsMatches = {rTeamsMatches}
            rCompetitionsMatches = {rCompetitionsMatches}
          />
        }/>
      </Routes>

    </>
  );
};

export default App;
