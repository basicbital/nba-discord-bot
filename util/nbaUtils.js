const moment = require('moment');
const moment_timezone = require('moment-timezone');

// data is array (for now)
// TODO: Investigate optimization in searching algorithm (Gabe: '.every' function)

/**
 * @param {Object[]} data JSON object of all nba players
 * @param {string} firstName First name of player
 * @param {string} lastName Last name of player
 * @return {number} teamId of player
 */
getTeamId = function (data, firstName, lastName) {
    let returnValue = 0
    data.forEach(player => {
        if (player.firstName === firstName && player.lastName === lastName) {
            returnValue =  player.teamId
        }
    })
    return returnValue
}

/**
 * @return {moment} date of Monday from current week
 */
getCurrentMonday = function() {
    const easternTime = moment_timezone().tz('America/New_York');
    const monDate = (moment(easternTime).day("Monday"));
  
    return monDate;
  }

/**
 * @param {moment} monDate date of Monday
 * @return {number[]} 7 dates of current week starting on Monday
 */
getDaysOfWeek = function(monDate) {
    let daysOfWeek = [];

    for(let i = 0; i < 7; ++i) {
        let addDate = monDate;
        daysOfWeek.push(addDate.format("YYYYMMDD"));
        addDate = monDate.add(1, "days");
    }
    return daysOfWeek;
}

/**
 * @param {Object[]} data JSON object of team games
 * @param {string[]} daysInWeek 7 sequential days always starting on Monday
 * @return {number} games played for given team in given week
 */
getGamesInWeek = function(data, daysInWeek) {
    let gamesPlayed = 0;
    data.forEach(game => {
        // logic to search all games
        let gameDate = game.startDateEastern
        if (gameDate >= daysInWeek[0] && gameDate <= daysInWeek[6]){
            gamesPlayed += 1;
        }
    })
    return gamesPlayed;
}

module.exports.getCurrentMonday = getCurrentMonday;
module.exports.getDaysOfWeek = getDaysOfWeek;
module.exports.getGamesInWeek = getGamesInWeek;
module.exports.getTeamId = getTeamId;
