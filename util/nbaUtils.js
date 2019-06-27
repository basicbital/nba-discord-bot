const moment = require('moment')
const momentTimeZone = require('moment-timezone')
const easternTime = momentTimeZone().tz('America/New_York')
const sprintf = require('sprintf-js').sprintf

// data is array (for now)
// TODO: Investigate optimization in searching algorithm (Gabe: '.every' function)

/**
 * @param {Object[]} data JSON object of all nba players
 * @param {string} firstName First name of player
 * @param {string} lastName Last name of player
 * @return {number} teamId of player
 */
const getTeamId = function (data, firstName, lastName) {
  let returnValue = 0
  data.forEach(player => {
    if (player.firstName === firstName && player.lastName === lastName) {
      returnValue = player.teamId
    }
  })
  return returnValue
}

/**
 * @return {moment} date of Monday from current week unformatted
 */
const getCurrentMonday = function () {
  return moment(easternTime).day('Monday')
}

/** moment start of day is sunday
  *  however we want start of day to be monday
  *  hence use days instead of weeks for manipulation
  * /

/**
 * @return {moment} prev monday unformatted
 */
const getPrevMonday = function () {
  return moment(easternTime).day('Monday').subtract(7, 'd')
}
/**
 * @return {moment} next monday unformatted
 */
const getNextMonday = function () {
  return moment(easternTime).day('Monday').add(7, 'd')
}
/**
 * @param {moment} monDate date of Monday
 * @return {number[]} 7 dates of current week starting on Monday
 */
const getDaysInWeek = function (monDate) {
  let daysOfWeek = []
  let addDate = moment(monDate) // implicit clone

  for (let i = 0; i < 7; ++i) {
    // let addDate = monDate; changed code here, moments are mutable
    // if left as it was on exiting this function monDate would be changed accordingly
    // to wat addDate was doing here -Mike
    daysOfWeek.push(addDate.format('YYYYMMDD'))
    //console.log(addDate.format('YYYYMMDD'))
    addDate.add(1, 'days')
  }
  return daysOfWeek
}

/**
 * @param {Object[]} data JSON object of team games
 * @param {string[]} daysInWeek 7 sequential days always starting on Monday
 * @return {number} games played for given team in given week
 */

const getGamesInWeek = function (data, daysInWeek) {
  let gamesPlayed = 0
  data.forEach(game => {
    // logic to search all games
    let gameDate = game.startDateEastern
    if (gameDate >= daysInWeek[0] && gameDate <= daysInWeek[6]) {
      gamesPlayed += 1
    }
  })
  return gamesPlayed
}

/**
 * @param {Object[]} data JSON object of team games
 * @param {number} lastPlayedIndex, index to last game in nba data json
 * @param {string[]} daysInWeek 7 sequential days starting on a Monday
 * @return {object[]} an array with dates played
 */
const getDaysPlayedOn = function (data, lastPlayedIndex, daysInWeek) {
  let datesPlayed = []
  /// TODO invalid date issue could occur here fix if happens
  data.slice(lastPlayedIndex).forEach(game => {
    let gameDate = game.startDateEastern
    if (gameDate >= daysInWeek[0] && gameDate <= daysInWeek[6]) {
      datesPlayed.push(gameDate)
    }
  })
  return datesPlayed
}

/// TODO CH-22 2/25/19
/// this logic can be refactored, JSON file has a lastStandardGamePlayedIndex
/// that indicates position of last played
/// example listed below as getGamesInWeekTest
/// refactoring could cause all code dependent on it to change might not be worth effort
/// for w.e optimization benefit it might give
/**
 * @param {Object[]} data JSON object of a team's gamesPlayed
 * @param {number} lastPlayedIndex index from JSON league: lastStandardGamePlayedIndex
 * @param {string[]} daysInWeek still not sure what the heck this is for, shouldn't it be dayInWeek?
 * @return {number} gamesPlayed returned with total games played for a given week
 */
// const getGamesInWeekTest = function (data, lastPlayedIndex, daysInWeek) {
//
// }

/**
 * @param {Object[]} data JSON object of players in a team
 * @return {Object[]} first and last name of all players
 */
const getAllPlayerNames = function (data) {
  let players = []
  for (let record in data) {
    if (record !== 'count') { // thanks yahoo
      let name = {
        'first': data[record].player[0][2].name.first,
        'last': data[record].player[0][2].name.last
      }
      players.push(name)
    }
  }
  return players
}

/**
 * @param {string}  token user refresh token
 * @return {string[]}  full names of players in a yahoo user team
 */
const displayUserMap = function (playersPlayingThisWeek) {
  let retStr = '```'

  // HARD CODED EXAMPLE TO PROCESS
  // const playersPlayingThisWeek = [{
  //   0: ['Monday', 'val1', 'val2', 'val3'],
  //   1: ['Tuesday', 'val1', 'val2', 'val3'],
  //   2: ['Wednesday', 'val1', 'val3', 'val3'],
  //   3: ['Thursday', 'val1', 'val2'],
  //   4: ['Friday', 'val1', 'val2'],
  //   5: ['Saturday', 'val1', 'val2'],
  //   6: ['Sunday', 'val1', 'val2']
  // }]

  for (let index = 0; index < 7; index++) {
    var str = ''
    for (let data in playersPlayingThisWeek[0][index]) {
      let arrayLength = playersPlayingThisWeek[0][index].length - 1
      if (data === '0') {
        // str = str + playersPlayingThisWeek[0][index][data] + '\t'
        let day = playersPlayingThisWeek[0][index][data]
        str = str + sprintf(`%1$' -12s`, `${day}`)
      } else if (data === '1') {
        let date = playersPlayingThisWeek[0][index][data]
        str = str + sprintf(`%1$' -10s`, `${date}`)
      } else if (data === arrayLength.toString()) {
        str = str + playersPlayingThisWeek[0][index][data] // truncate names doable here adjust with sprintf(s) check docs
      } else {
        str = str + playersPlayingThisWeek[0][index][data] + ', '
      }
    }
    retStr = retStr + str + '\r\n'
  }
  retStr += '```'
  return retStr
}

/**
 * @param {Object[]} data JSON object of players in a team
 * @param {String} leagueName Player's nba league name
 * @return {String} Nba league_id
 */
// will use getPlayerLeagues() for data
const getPlayersNbaLeagueId = function (data, leagueName) {
  const length = data.count
  for (let index = 0; index < length; index++) {
    if (data[index].game[0].name === 'Basketball') {
      const leagueLength = data[index].game[1].leagues.count
      for (let index = 0; index < leagueLength; index++) {
        if (leagueName === data[index].game[1].leagues[index].league[0].name) {
          return data[index].game[1].leagues[index].league[0].league_id
        }
      }
    }
  }
}

module.exports.getAllPlayerNames = getAllPlayerNames
module.exports.getCurrentMonday = getCurrentMonday
module.exports.getDaysInWeek = getDaysInWeek
module.exports.getGamesInWeek = getGamesInWeek
module.exports.getTeamId = getTeamId
module.exports.getPrevMonday = getPrevMonday
module.exports.getNextMonday = getNextMonday
module.exports.displayUserMap = displayUserMap
module.exports.getDaysPlayedOn = getDaysPlayedOn
module.exports.getPlayersNbaLeagueId = getPlayersNbaLeagueId
