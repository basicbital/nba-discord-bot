const Discord = require('discord.js')
const nbaUtil = require('./util/nbaUtils.js')
const nbaData = require('./api/nbaData.js')
// const ui = require('./response_ui/responseUI')
const yUtils = require('./util/yahooUtils')
// const yahooAuthData = require('./api/yahooAuthData')

const client = new Discord.Client()
let refreshToken = ''

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
  if (message.author.username !== client.user.username) {
    if (message.channel.type === 'dm') {
      const msg = message.content.split(' ')
      if (msg[0] === 'setRefresh') {
        if (msg.length === 2) {
          refreshToken = msg[1]
          console.log(`Refresh Token set to: ${refreshToken}`)
          message.reply(`Refresh token is now ${refreshToken}`)
        } else {
          console.log(`[Error] setRefresh: Message length should only be 2 but is actually ${msg.length} `)
          message.reply('Rejected. Try again noob.')
        }
      }
    }
  }
})

// console.log(yahooAuthData.getAuthCode().then(resp => console.log(resp)))
// console.log(yahooAuthData.getInitialToken('').then(resp => console.log(resp)))
// console.log(yahooAuthData.getRefreshedToken('').then(resp => console.log(resp)))

client.login(process.env.DISCORD_TOKEN)
