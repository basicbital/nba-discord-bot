const Discord = require('discord.js')
const nbaUtil = require('./util/nbaUtils.js')
const nbaData = require('./api/nbaData.js')
// const yahooData = require('./api/yahooData')

const client = new Discord.Client()

client.on('message', message => {
  if (message.content === 'hi') {
    message.channel.send('hellow world.')
  }

  if (message.content === 'days') {
    message.channel.send(nbaUtil.getDaysOfWeek(nbaUtil.getCurrentMonday()))
  }

  if (message.content === 'days') {
    message.channel.send(nbaUtil.getDaysInWeek(nbaUtil.getCurrentMonday()))
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
})

// console.log(yahooData.getAuthCode().then(resp => console.log(resp)))
// console.log(yahooData.getInitialToken('').then(resp => console.log(resp)))
// console.log(yahooData.getRefreshedToken('').then(resp => console.log(resp)))

client.login(process.env.DISCORD_TOKEN)
