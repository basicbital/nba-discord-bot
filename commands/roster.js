const nbaUtil = require('../util/nbaUtils')
const yUtils = require('../util/yahooUtils')

module.exports = {
  name: 'roster',
  description: 'returns user roster for current week',
  async execute (message, args) {
    let userRoster = await yUtils.createRosterDateMap().then(resp => (resp))
    let msg = ''
    if (userRoster !== null) {
      msg = nbaUtil.displayUserMap(userRoster)
      message.channel.send(msg)
    } else {
      message.channel.send('error occurred... unable to retrieve roster')
    }
  }
}
