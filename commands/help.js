const fs = require('fs')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

module.exports = {
  name: 'help',
  description: 'list available commands',
  execute (message, args) {
    let helpMsg = '```'
    if (args === 'invalid') {
      helpMsg += 'Warning: Invalid Command Entered\r\n'
    }
    helpMsg += 'These are the commands available for ChickHearnBot:\r\n'
    for (let index in commandFiles) {
      helpMsg += '!' + commandFiles[index].replace(/.js$/, '') + '\r\n'
    }
    helpMsg += '```'
    message.channel.send(helpMsg)
  }
}
