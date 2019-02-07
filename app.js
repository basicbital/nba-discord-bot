const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

client.on("message", message => {
	
	if (message.content === 'hi') {
		
		message.channel.send('hellow world.');
		
	}
	if (message.content === 'test') {
		
		console.log('test me some more!')
		
	}
	if (message.content === 'YAHOO') {
		fetch('https://fantasysports.yahooapis.com/fantasy/v2/game/')
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log('We done goofed fam');
			})
	}
	if (message.content === 'nba') {
		fetch('http://data.nba.net/10s/prod/v1/2018/players.json')
			.then(res => {
				return res.json();
			})
			.then(response => {
				console.log(response.league);
			})
			.catch(err => {
				console.log(`${err} Parse that json better boi`);
			})
	}
})

client.login(process.env.YAHOO_TOKEN);