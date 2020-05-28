const fetch = require('node-fetch')
/**
 * @return {Promise<pending>} Year of the nba season
 */
const getNbaYear = function () {
  return fetch('http://data.nba.net/10s/prod/v1/today.json')
    .then(res => {
      return res.json()
    })
    .then(response => {
      return response.teamSitesOnly.seasonYear
    })
    .catch(err =>{
      console.log(`${err} Promise error`)
    })
}
/**
 * @return {Promise<pending>} First name available from players.json
 */
const getFirstPlayer = async function () {
  let nbaYear = await getNbaYear().then(resp => (resp))
  return fetch(`http://data.nba.net/10s/prod/v1/${nbaYear}/players.json`)
    .then(res => {
      return res.json()
    })
    .then(response => {
      return (response.league.standard)[0].firstName
    })
    .catch(err => {
      console.log(`${err} Promise error`)
    })
}
/**
 * @return {Promise<pending>} All nba players
 */
const getPlayers = async function () {
  let nbaYear = await getNbaYear().then(resp => (resp))
  return fetch(`http://data.nba.net/10s/prod/v1/${nbaYear}/players.json`)
    .then(res => {
      return res.json()
    })
    .then(response => {
      return response.league.standard
    })
    .catch(err => {
      console.log(`${err} Promise error`)
    })
}

/**
 * @param {number} teamId Unique key for nba team
 * @return {Promise<pending>} All given team games
 */
const getTeamSchedule = async function (teamId) {
  let nbaYear = await getNbaYear().then(resp =>(resp))
  return fetch(`http://data.nba.net/10s/prod/v1/${nbaYear}/teams/${teamId}/schedule.json`)
    .then(res => {
      return res.json()
    })
    .then(response => {
      const data = response.league.standard
      return data
    })
    .catch(err => {
      console.log(`${err} That teamId doesn't exist`)
    })
}

/**
 * @param {string} teamId Unique key for nba team
 * @return {number} index of last game played by TeamId
 */
const getLastPlayedIndex = async function (teamId) {
  let nbaYear = await getNbaYear().then(resp =>(resp))
  return fetch(`http://data.nba.net/10s/prod/v1/${nbaYear}/teams/${teamId}/schedule.json`)
    .then(res => {
      return res.json()
    })
    .then(response => {
      const data = response.league.lastStandardGamePlayedIndex
      return data
    })
    .catch(err => {
      console.log(`${err} That teamId doesn't exist`)
    })
}

module.exports.getNbaYear = getNbaYear
module.exports.getFirstPlayer = getFirstPlayer
module.exports.getPlayers = getPlayers
module.exports.getTeamSchedule = getTeamSchedule
module.exports.getLastPlayedIndex = getLastPlayedIndex
