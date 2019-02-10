/**
 * @return {Object[]} All nba players
 */
getPlayers = function() {

    fetch('http://data.nba.net/10s/prod/v1/2018/players.json')
        .then(res => {
            return res.json();
        })
        .then(response => {
            nbaData = response.league.standard
            return nbaData;
        })
        .catch(err => {
            console.log(`${err} We don't know which player boi`);
        })
    }

/**
 * @return {Object[]} All given team games
 */
getTeamSchedule = function() {    
    fetch(`http://data.nba.net/10s/prod/v1/2018/teams/${teamId}/schedule.json`)
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
