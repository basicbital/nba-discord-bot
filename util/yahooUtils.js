const yahooData = require('../api/yahooData')
const nbaData = require('../api/nbaData')
const nbaUtils = require('../util/nbaUtils')
/// For hardcoding
const dotenv = require('dotenv')
dotenv.config()
/// For hardcoding

/**
 * @return {string} returns league id of user
 */
// var getUserLeagueId = async function () {
//
// }

/**
 * @return {string} returns refresh token
 */
// var getRefreshedToken() = async function () {

// }

/**
 * @return {object} return players mapped to dates (e.g. : [{0: ['Monday','player1'], 1: ['Tuesday','player1']}] )
 */
const createRosterDateMap = async function () {
  const moment = require('moment')
  let allRosterData = await nbaData.getPlayers().then(resp => (resp))
  /// TODO DELETE EVENTUALLY ===== HARD CODED DATA
  let token = await yahooData.getRefreshedToken(process.env.REFRESH_TOKEN).then(resp => (resp))
  let rosterData = await nbaData.getPlayerRoster(token.access_token, process.env.LEAGUE_ID, process.env.TEAM_ID).then(resp => (resp))
  let roster = nbaUtils.getAllPlayerNames(rosterData)
  /// DELETE AND REPLACE HARD CODED DATA
  let weekDates = nbaUtils.getDaysInWeek(moment().day('Monday'))
  let thisWeeksDates = [{
    0: ['Sunday'],
    1: ['Monday'],
    2: ['Tuesday'],
    3: ['Wednesday'],
    4: ['Thursday'],
    5: ['Friday'],
    6: ['Saturday']
  }]

  for (let index = 0; index < 7; index++) {
    thisWeeksDates[0][index].push(moment().day(index).format('M-D-YY')) /// TODO what happens when Month is double digit?
    /// Potential way to modify this to a generic return date for customizability?
  }

  for (let player in roster) {
    if (player !== 'count') {
      let teamId = nbaUtils.getTeamId(allRosterData, roster[player].first, roster[player].last)
      let teamSchedule = await nbaData.getTeamSchedule(teamId).then(resp => (resp))
      let lastPlayedIndex = await nbaData.getLastPlayedIndex(teamId).then(resp => (resp))
      let playerDatePlaying = nbaUtils.getDaysPlayedOn(teamSchedule, lastPlayedIndex, weekDates)
      for (let date in playerDatePlaying) {
        if (date !== 'count') {
          let dateplaying = moment(playerDatePlaying[date]).format('M-D-YY')
          for (let index = 0; index < 7; index++) {
            let givenDates = thisWeeksDates[0][index][1]
            if (index !== 'count') {
              if (dateplaying === givenDates) {
                thisWeeksDates[0][index].push(roster[player].last)
              }
            }
          }
        }
      }
    }
  }
  return thisWeeksDates
}

module.exports.createRosterDateMap = createRosterDateMap
