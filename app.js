// const yahooAuthData = require('./api/yahooAuthData')
// const { getChickism } = require('./util/appUtils')
let refreshToken = ''
const discord = require('discord.js')
const { prefix } = require('./config.json')
const fs = require('fs')

const client = new discord.Client()
client.commands = new discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('READY in apptest.js')
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  // if user submits/mispells invalid command, list available commands
  if (!client.commands.has(command)) {
    client.commands.get('help').execute(message, 'invalid')
    return
  }

  try {
    client.commands.get(command).execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply(`there was an error`)
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
// console.log(getChickism())

client.login(process.env.DISCORD_TOKEN)
