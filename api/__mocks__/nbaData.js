// Mock Note:
// unable to manually mock the data since data can change season to season
// for now these two function will only gather a portion of the data from
// nba.net and to be used in testing rather than pulling with the api
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
  console.log('In mocked nbaData.js\nFunction: getPlayers')
  let players = getFirstPlayerData().then(resp => (resp))
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(players))
  })
}

const getTeamSchedule = function (teamId) {
  console.log('In mocked nbaData.js\nFunction: getTeamSchedule')
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(teamSchedule)) // mock data is .league.standard
  })
}

const getLastPlayedIndex = function () {
  console.log('In mocked nbaData.js\nFunction: getLastPlayedIndex')
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(teamSchedule.league.lastStandardGamePlayedIndex))
  })
}

const getPlayerLeagues = function () {
  console.log('In mocked nbaData.js\nFunction: getPlayerLeagues')
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(leagueData))
  })
}

module.exports.getPlayerLeagues = getPlayerLeagues
module.exports.getPlayers = getPlayers
module.exports.getTeamSchedule = getTeamSchedule
module.exports.getLastPlayedIndex = getLastPlayedIndex
