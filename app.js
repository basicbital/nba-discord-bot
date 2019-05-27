const Discord = require('discord.js')
const nbaUtil = require('./util/nbaUtils.js')
const nbaData = require('./api/nbaData.js')
// const ui = require('./response_ui/responseUI')
const yUtils = require('./util/yahooUtils')
// const yahooAuthData = require('./api/yahooAuthData')

const client = new Discord.Client()

client.on('message', async message => {
  if (message.content === 'hi') {
    message.channel.send('hellow world.')
  }

  if (message.content === 'days') {
    message.channel.send(nbaUtil.getDaysOfWeek(nbaUtil.getCurrentMonday()))
  }

  if (message.content === 'player') {
    let firstName = 'Quinn'
    let lastName = 'Cook'
    nbaData.getPlayers().then(
      resp => {
        let teamId = nbaUtil.getTeamId(resp, firstName, lastName)
        nbaData.getTeamSchedule(teamId).then(resp => console.log(resp))
      }
    )
  }

  if (message.content === 'r') {
    // call ui to get roster and feed into displayData
    let userRoster = await yUtils.createRosterDateMap().then(resp => (resp))
    let msg = nbaUtil.displayUserMap(userRoster)
    console.log(msg)
    message.channel.send(msg)
  }
})

// console.log(yahooAuthData.getAuthCode().then(resp => console.log(resp)))
// console.log(yahooAuthData.getInitialToken('').then(resp => console.log(resp)))
// console.log(yahooAuthData.getRefreshedToken('').then(resp => console.log(resp)))

client.login(process.env.DISCORD_TOKEN)
