const { URLSearchParams } = require('url')
const fetch = require('node-fetch')

/**
 * @param {string} authCode code
 * @return {Promise<pending>} access_token and refresh_token
 */
const getInitialToken = function (authCode) {
  const params = new URLSearchParams({
    redirect_uri: 'oob',
    code: authCode,
    grant_type: 'authorization_code'
  })

  return fetch('https://api.login.yahoo.com/oauth2/get_token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + process.env.YAHOO_API_KEY,
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
    .then(res => {
      return res.json()
    })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => {
      console.log(`${err} Promise error`)
    })
}

/**
 * @param {string} refreshToken refresh_token
 * @return {Promise<pending>} access_token and refresh_token
 */
const getRefreshedToken = function (refreshToken) {
  const params = new URLSearchParams({
    redirect_uri: 'oob',
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  })

  return fetch('https://api.login.yahoo.com/oauth2/get_token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + process.env.YAHOO_API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
    .then(res => {
      return res.json()
    })
    .then(response => {
      // console.log(response.refresh_token)
      return response
    })
    .catch(err => {
      console.log(`${err} Promise error`)
    })
}

/**
 * @return {Promise<pending>} Yahoo Auth code
 */
const getAuthCode = function () {
// TODO future selenium method to login to yahoo and grab authCode

  const redirectURL = 'oob'
  const responseType = 'code'

  const params = '?' + 'client_id=' + process.env.YAHOO_CLIENT_ID + '&' + 'redirect_uri=' + redirectURL + '&' + 'response_type=' + responseType

  return fetch('https://api.login.yahoo.com/oauth2/request_auth' + params)
    .then(res => {
      return res
    })
    .then(response => {
      console.log(response.url)
      return response
    })
    .catch(err => {
      console.log(`${err}`)
    })
}

module.exports.getAuthCode = getAuthCode
module.exports.getInitialToken = getInitialToken
module.exports.getRefreshedToken = getRefreshedToken
