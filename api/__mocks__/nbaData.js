// const players = [{
//   'firstName': 'Jaylen',
//   'lastName': 'Adams',
//   'personId': '1629121',
//   'teamId': '1610612737',
//   'jersey': '10',
//   'isActive': true,
//   'pos': 'G',
//   'heightFeet': '6',
//   'heightInches': '2',
//   'heightMeters': '1.88',
//   'weightPounds': '190',
//   'weightKilograms': '86.2',
//   'dateOfBirthUTC': '1996-05-04',
//   'teams':
//   [{ 'teamId': '1610612737',
//     'seasonStart': '2018',
//     'seasonEnd': '2018'
//   }],
//   'draft': {
//     'teamId': '',
//     'pickNum': '',
//     'roundNum': '',
//     'seasonYear': ''
//   },
//   'nbaDebutYear': '2018',
//   'yearsPro': '0',
//   'collegeName': 'St. Bonaventure',
//   'lastAffiliation': 'St. Bonaventure/USA',
//   'country': 'USA'
// }]

// const teamSchedule = [
//   { 'startDateEastern': '20181001' },
//   { 'startDateEastern': '20181003' },
//   { 'startDateEastern': '20181004' }
// ]
const fetch = require('node-fetch')
const getRosterRaw = function () {
  return fetch('http://data.nba.net/10s/prod/v1/today.json')
    .then(res => {
      return res.json()
    })
    .then(response => {
      return response.links.leagueRosterPlayers
    })
    .catch(err => {
      console.log(`${err} Promise error`)
    })
}
const getFirstPlayerData = async function () {
  let append = await getRosterRaw().then(resp => (resp))
  return fetch(`http://data.nba.net/10s${append}`)
    .then(res => {
      return res.json()
    })
    .then(response => {
      return response.league.standard
    })
    .catch(err => {
      console.log(`${err} Promise error: in getFirstPlayerData`)
    })
}

const teamSchedule = require('./mockschedule.json')
const leagueData = require('./users_games_leagues.json')

const getPlayers = async function () {
  let players = getFirstPlayerData().then(resp => (resp))
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(players))
  })
}

const getTeamSchedule = function (teamId) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(teamSchedule)) // mock data is .league.standard
  })
}

const getLastPlayedIndex = function () {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(teamSchedule.league.lastStandardGamePlayedIndex))
  })
}

const getPlayerLeagues = function () {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(leagueData))
  })
}

module.exports.getPlayerLeagues = getPlayerLeagues
module.exports.getPlayers = getPlayers
module.exports.getTeamSchedule = getTeamSchedule
module.exports.getLastPlayedIndex = getLastPlayedIndex
