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

/**
 * @param accessToken Yahoo fantasy access_token
 * @param leagueId ID of a user's fantasy league
 * @param teamId ID of a user's fantasy team within a league. Expects the team to be within the league provided by leagueId
 * @return {Promise<pending>} JSON containing all the players in the team
 */
const getPlayerRoster = function (accessToken, leagueId, teamId) {
  return fetch(`https://fantasysports.yahooapis.com/fantasy/v2/team/385.l.${leagueId}.t.${teamId}/roster/players?format=json`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
    .then(res => {
      return res.json()
    })
    .then(response => {
      return response.fantasy_content.team[1].roster['0'].players
    })
    .catch(err => {
      console.log(`${err}`)
    })
}

/**
 * @param accessToken Yahoo fantasy access_token
 * @return {Promise<pending>} JSON containing the logged in player's leagues
 */
const getPlayerLeagues = function (accessToken) {
  return fetch('https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games/leagues?format=json', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => {
      return res.json()
    })
    .then(response => {
      return response.fantasy_content.users[0].user[1].games
      // return response.fantasy_content.users[0].user[1].games[0].game[1].leagues[0].league[0].league_id
    })
    .catch(err => {
      console.log(`${err}`)
    })
}

module.exports.getNbaYear = getNbaYear
module.exports.getFirstPlayer = getFirstPlayer
module.exports.getPlayers = getPlayers
module.exports.getPlayerRoster = getPlayerRoster
module.exports.getTeamSchedule = getTeamSchedule
module.exports.getLastPlayedIndex = getLastPlayedIndex
module.exports.getPlayerLeagues = getPlayerLeagues
