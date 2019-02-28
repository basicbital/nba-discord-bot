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
 * @return {moment} date of Monday from current week
 */
getCurrentMonday = function() {  
    return moment(easternTime).day("Monday");
}

/**
 * @return {moment} prev monday
 */
getPrevMonday = function(){
    return moment(easternTime).day("Monday").subtract(1,'w').format();    
}

/**
 * @return {moment} next monday
 */
getNextMonday = function(){
    return moment(easternTime).day("Monday").add(1, 'w').format();
}

/**
 * @param {moment} monDate date of Monday
 * @return {number[]} 7 dates of current week starting on Monday
 */
getDaysOfWeek = function(monDate) {
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

/// TODO this logic can be refactored JSON, file has a lastStandardGamePlayedIndex
/// that indicates position of last played game - Mike
/**
 * @param {Object[]} data JSON object of a team's gamesPlayed
 * @param {number} lastPlayedIndex index from JSON league: lastStandardGamePlayedIndex
 * @param {string[]} daysInWeek still not sure what the heck this is for, shouldn't it be dayInWeek?
 * @return {number} gamesPlayed returned with total games played for a given week
 */
getGamesInWeekTest = function(data, lastPlayedIndex, daysInWeek) {
    
}

/**
 * @param {Object[]} data JSON object of players in a team
 * @return {Object[]} first and last name of all players
 */
getAllPlayerNames = function(data) {
    let players = []
    for (let record in data) {
        let name = {
            "first": data[record].player[0][2].name.first,
            "last": data[record].player[0][2].name.last
        }
        players.push(name)
    }
    return players
}

module.exports.getAllPlayerNames = getAllPlayerNames
module.exports.getCurrentMonday = getCurrentMonday;
module.exports.getDaysOfWeek = getDaysOfWeek;
module.exports.getGamesInWeek = getGamesInWeek;
module.exports.getTeamId = getTeamId;
module.exports.getPrevMonday = getPrevMonday;
module.exports.getNextMonday = getNextMonday;
