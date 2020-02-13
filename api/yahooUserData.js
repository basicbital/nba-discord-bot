const fetch = require('node-fetch')
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

module.exports.getPlayerRoster = getPlayerRoster
module.exports.getPlayerLeagues = getPlayerLeagues
