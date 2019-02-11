const fetch = require('node-fetch');

const playerDataUrl = 'http://data.nba.net/10s/prod/v1/2018/players.json'

/**
 * @return {Promise{<pending>}} All nba players
 */
function getPlayers(){
    return fetch(playerDataUrl)
    .then(data =>{return data.json();})
    .then(json =>{return json.league.standard;});
}

/**
 * @return {Promise{<pending>}} All given team games
 */
getTeamSchedule = function(teamId) {    
    return fetch(`http://data.nba.net/10s/prod/v1/2018/teams/${teamId}/schedule.json`)
    .then(res => {
        return res.json();
    })
    .then(response => {
        const data = response.league.standard
        return data;
    })
    .catch(err => {
        console.log(`${err} You don't know how many games team played son`);
    })
}

module.exports.getPlayers = getPlayers;
module.exports.getTeamSchedule = getTeamSchedule;
