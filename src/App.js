import React, { useState, useRef } from 'react'
import FirstList from './components/FirstList'
import SecondList from './components/SecondList'

function App() {

  // Вынести в отдельный файл при деплое !!!!!!!!!!!!!!!!!!!!!!!!!!!
  const secret = 'd1172b57700b4df29bba15452110f918';

  const [statusFirstList, setStatusFirstList] = useState(false);
  const [radio, setRadio] = useState("0");
  const [id, setId] = useState(null)
  const countNewKey = useRef(0)
 
  // ----------------------------------------------------------------

  //  Возвращает уникально число. Используется для раздачи уникальных 
  // ключей.
  function getRandomKey() {
    countNewKey.current++
    return countNewKey.current
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
      )
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
      )
    }
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
    let iLogo 

    for (let i =0; i < data.length; i++){
      if (data[i].emblemUrl != null){
        iLogo = data[i].emblemUrl
      }else if(data[i].area.ensignUrl != null){
        iLogo = data[i].area.ensignUrl
      }else{
        iLogo = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg'
      };
        
      const iCompetition = {
        name: data[i].name,
        id: data[i].id,
        logo: iLogo,
      };

      returnData.push(iCompetition)
    };

    return returnData
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

      returnData.push(iTeam)
    };

    return returnData
  }

  // --------------------------------------------------------------------------------------

  // Запрос матчей команды.
  // Принимает id команды, возвращает массив.

  async function rTeamsMatches(id){
    let data;
    const returnData = [];

    try {
      data = await fetch(
        `https://api.football-data.org/v2/teams/${id}/matches`, 
      {
        headers: {'X-Auth-Token': secret,}
      }).then((response) => {
        return response.json();
      });
    }catch (e){
      alert(
        'Вы привысили предельно допустимое количество запросов в минуту. Подождите 1 минуту затем повторите попытку'
      )

      return returnData
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

      returnData.push(iMatch)
    };

    console.log(returnData); // Удалить!!!
    return returnData
  };

  // Запрос матчей соревнования.
  // Принимает id соревнования, возвращает массив объектов.
  async function rCompetitionsMatches(id){
    let data = await fetch(`https://api.football-data.org/v2/competitions/${id}/matches`, {
      headers: {'X-Auth-Token': secret,}
    }).then((response) => {
      return response.json();
    });

    data = data.matches
    const returnData = [];

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
      
      returnData.push(iMatch)
    };

    console.log(returnData); // Удалить!!!
    return returnData
  };

  //  Обновляет данные в локальном хранилище, список 
  // команд и список соревнований.
  async function saveLocalStorege() {
    let teamsList;
    let competitionsList;

    rTeams().then((response) => {
      localStorage.setItem("teamsList", JSON.stringify(response));
      teamsList = response;
      console.log(response); //Удалять!!!
    });
    rCompetitions().then((response) => {
      localStorage.setItem("competitionsList", JSON.stringify(response))
      competitionsList = response;
      console.log(response); //Удалить !!!
    });

    return [teamsList, competitionsList]
  }

  // ----------------------------------------------------------------

  //  Проверяет наличие данных о коммандах и матчах в локальном 
  // хранилище. Если их нет вызывает функцию по их загрузке.  
  if (localStorage["teamsList"] == undefined || localStorage["competitionsList"] == undefined) {
    saveLocalStorege().then(data => {});
  };

  return (
    <div className="app">
      <FirstList 
        radio={radio}
        setId={setId}
        setRadio={setRadio}
        status={statusFirstList} 
        show={show}
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
        radio={radio}
        id={id}
        getRandomKey={getRandomKey}
        rTeamsMatches={rTeamsMatches}
        rCompetitionsMatches={rCompetitionsMatches}
      />
    </div>
  );
}

export default App;
