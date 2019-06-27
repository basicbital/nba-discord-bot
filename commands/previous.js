const nbaUtil = require('../util/nbaUtils')
const yUtils = require('../util/yahooUtils')

module.exports = {
  name: 'previous',
  description: 'returns user roster for previous of current week',
  async execute (message, args) {
    let userRoster = await yUtils.createRosterDateMap(-6).then(resp => (resp))
    //-6 to account for default Sunday start and -6 to get to last monday
    let msg = ''
    if (userRoster !== null) {
      msg = nbaUtil.displayUserMap(userRoster)
      message.channel.send(msg)
    } else {
      message.channel.send('error occurred... unable to retrieve roster')
    }
  }
}
