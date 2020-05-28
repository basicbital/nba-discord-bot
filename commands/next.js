const nbaUtil = require('../util/nbaUtils')
const yUtils = require('../util/yahooUtils')

module.exports = {
  name: 'next',
  description: 'returns user roster for next of current week',
  async execute (message, args) {
    let userRoster = await yUtils.createRosterDateMap(8).then(resp => (resp))
    //8 to account for +1 for mondayStart and +7 for next monday
    let msg = ''
    if (userRoster !== null) {
      msg = nbaUtil.displayUserMap(userRoster)
      message.channel.send(msg)
    } else {
      message.channel.send('error occurred... unable to retrieve roster')
    }
  }
}
