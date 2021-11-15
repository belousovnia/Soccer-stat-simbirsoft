'use strict'

const secret = 'd1172b57700b4df29bba15452110f918';

// --------------------------------------------------------------------------------------

// Запрос списка соревнаваний.
// Возвращает список соревнаваний в виде объекта с именем, id и эмблемой соревнавания.

export async function rCompetitions(){

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
}

// --------------------------------------------------------------------------------------

// Запрос списка комманд.
// Возвращает список со всеми командами в виде объектов с именем, id и эмблемой.

export async function rTeams(){

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

export async function rTeamsMatches(id){

    let data = await fetch(`https://api.football-data.org/v2/teams/${id}/matches`, {
        headers: {'X-Auth-Token': secret,}
    }).then((response) => {
        return response.json();
    });

    data = data.matches;
    const returnData = [];

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
                    data[i].score.halfTime.homeTeam + 
                    data[i].score.extraTime.homeTeam + 
                    data[i].score.penalties.homeTeam,
            },
            awayTeam: {
                name: data[i].awayTeam.name,
                id: data[i].awayTeam.id,
                score: data[i].score.fullTime.awayTeam + 
                    data[i].score.halfTime.awayTeam + 
                    data[i].score.extraTime.awayTeam + 
                    data[i].score.penalties.awayTeam,
            },
        };
        returnData.push(iMatch)
    };

    return returnData
}

// --------------------------------------------------------------------------------------

// Запрос матчей соревнования.
// Принимает id соревнования, возвращает массив объектов.

export async function rCompetitionsMatches(id){
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
            homeTeam: {
                name: data[i].homeTeam.name,
                id: data[i].homeTeam.id,
                score: data[i].score.fullTime.homeTeam + 
                    data[i].score.halfTime.homeTeam + 
                    data[i].score.extraTime.homeTeam + 
                    data[i].score.penalties.homeTeam,
            },
            awayTeam: {
                name: data[i].awayTeam.name,
                id: data[i].awayTeam.id,
                score: data[i].score.fullTime.awayTeam + 
                    data[i].score.halfTime.awayTeam + 
                    data[i].score.extraTime.awayTeam + 
                    data[i].score.penalties.awayTeam,
            },
        };
        returnData.push(iMatch)
    }

    return returnData
}

// --------------------------------------------------------------------------------------

// Обновляет данные в локальном хранилище, список команд и список соревнований.

export function saveLocalStorege() {
    rTeams().then((response) => {
        localStorage.setItem("teamsList", JSON.stringify(response));
    });
    rCompetitions().then((response) => {
        localStorage.setItem("competitionsList", JSON.stringify(response))
    });
}

// --------------------------------------------------------------------------------------
