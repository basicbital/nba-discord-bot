const moment = require('moment');
const moment_timezone = require('moment-timezone');
const easternTime = moment_timezone().tz('America/New_York');

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
 * @return {moment} date of Monday from current week unformatted
 */
getCurrentMonday = function() {  
    return moment(easternTime).day("Monday");
}

/** moment start of day is sunday
  *  however we want start of day to be monday
  *  hence use days instead of weeks for manipulation
  * /
  
/**
 * @return {moment} prev monday unformatted
 */
getPrevMonday = function(){
    return moment(easternTime).day("Monday").subtract(7,'d');
}
/**
 * @return {moment} next monday unformatted
 */
getNextMonday = function(){
    return moment(easternTime).day("Monday").add(7, 'd');
}
/**
 * @param {moment} monDate date of Monday
 * @return {number[]} 7 dates of current week starting on Monday
 */
getDaysInWeek = function(monDate) {
    let daysOfWeek = [];
    let addDate = moment(monDate); // implicit clone

    for(let i = 0; i < 7; ++i) {
        // let addDate = monDate; changed code here, moments are mutable
        // if left as it was on exiting this function monDate would be changed accordingly
        // to wat addDate was doing here -Mike
        daysOfWeek.push(addDate.format("YYYYMMDD"));
        addDate.add(1, "days");
    }
    return daysOfWeek;
}



/// TODO CH-22 2/25/19
/// this logic can be refactored, JSON file has a lastStandardGamePlayedIndex
/// that indicates position of last played 
/// example listed below as getGamesInWeekTest

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


/**
 * @param {Object[]} data JSON object of a team's gamesPlayed
 * @param {number} lastPlayedIndex index from JSON league: lastStandardGamePlayedIndex
 * @param {string[]} daysInWeek still not sure what the heck this is for, shouldn't it be dayInWeek?
 * @return {number} gamesPlayed returned with total games played for a given week
 */
getGamesInWeekTest = function(data, lastPlayedIndex, daysInWeek) {
    
}

module.exports.getCurrentMonday = getCurrentMonday;
module.exports.getDaysInWeek = getDaysInWeek;
module.exports.getGamesInWeek = getGamesInWeek;
module.exports.getTeamId = getTeamId;
module.exports.getPrevMonday = getPrevMonday;
module.exports.getNextMonday = getNextMonday;
