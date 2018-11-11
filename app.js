const Discord = require('discord.js');
const client = new Discord.Client();

client.on("message", message => {
	
	if (message.content === 'hi') {
		
		message.channel.send('hellow world.');
		
	}
})

client.login("{token}");