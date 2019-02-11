/**
 * @return {Promise<pending>} All nba players
 */
getPlayers = function() {
    return fetch('http://data.nba.net/10s/prod/v1/2018/players.json')
        .then(res => {
            return res.json();
        })
        .then(response => {
            nbaData = response.league.standard
            return nbaData;
        })
        .catch(err => {
            console.log(`${err} Promise error`);
        })
    }

/**
 * @param {number} teamId Unique key for nba team
 * @return {Promise<pending>} All given team games
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
            console.log(`${err} That teamId doesn't exist`);
        })
    }

module.exports.getPlayers = getPlayers;
module.exports.getTeamSchedule = getTeamSchedule;
