const nbaUtil = require('../util/nbaUtils')
const nbaData = require('../api/nbaData')
const moment = require('moment')
const sprintf = require('sprintf-js').sprintf

module.exports = {
  name: 'player',
  description: 'specify player to search schedule',
  async execute (message, args) {
    let firstName = args[0]
    let lastName = args[1]
    let nbaPlayers = await nbaData.getPlayers().then(resp => (resp))
    let teamId = nbaUtil.getTeamId(nbaPlayers, firstName, lastName)
    let teamSchedule = await nbaData.getTeamSchedule(teamId).then(resp => (resp))
    let lastPlayedIndex = await nbaData.getLastPlayedIndex(teamId)
    let daysPlayedOn = nbaUtil.getDaysPlayedOn(teamSchedule, lastPlayedIndex, nbaUtil.getDaysInWeek(nbaUtil.getCurrentMonday()))
    let msg = '```'
    msg += firstName + ' ' + lastName + ' plays on: ' + '\r\n'
    var thisStr = ''
    for (let index in daysPlayedOn) {
      if (!(index < daysPlayedOn.length - 1)) {
        let day = moment(daysPlayedOn[index]).format('MM/DD/YYYY')
        thisStr += sprintf(`%1$' -10s`, `${day}`)
      } else {
        let day = moment(daysPlayedOn[index]).format('MM/DD/YYYY')
        thisStr += sprintf(`%1$' -10s`, `${day}, `)
      }
    }
    msg += thisStr + '```'
    // console.log(msg)
    message.channel.send(msg)
  }
}
