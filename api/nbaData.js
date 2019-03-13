const fetch = require('node-fetch')
const yahooData = require('./yahooData.js')
/**
 * @return {Promise<pending>} All nba players
 */
const getPlayers = function () {
  return fetch('http://data.nba.net/10s/prod/v1/2018/players.json')
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
const getTeamSchedule = function (teamId) {
  return fetch(`http://data.nba.net/10s/prod/v1/2018/teams/${teamId}/schedule.json`)
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
const getLastPlayedIndex = function (teamId) {
  return fetch(`http://data.nba.net/10s/prod/v1/2018/teams/${teamId}/schedule.json`)
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

const getTeamIdByName = function (accessToken, leagueId) {
  return fetch(`https://fantasysports.yahooapis.com/fantasy/v2/league/nba.l.${leagueId}/standings?format=json`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
    .then(res => {
      return res.json()
    })
    .then(response => {
      let num_teams = Object.keys(response.fantasy_content.league[1].standings[0].teams).length
      let team_obj = {}
      for(let i = 0; i < num_teams - 1; ++i) {
        team_obj[response.fantasy_content.league[1].standings[0].teams[i].team[0][2].name] = response.fantasy_content.league[1].standings[0].teams[i].team[0][1].team_id
      }
      return team_obj
    })
    .catch(err => {
      console.log(`${err}`)
    })
}

let teamIds = getTeamIdByName(accessToken, 194346)
teamIds.then(resp => console.log(resp['Mad Doggs']))

module.exports.getLastPlayedIndex = getLastPlayedIndex
module.exports.getPlayers = getPlayers
module.exports.getPlayerRoster = getPlayerRoster
module.exports.getTeamSchedule = getTeamSchedule
module.exports.getTeamIdByName = getTeamIdByName
