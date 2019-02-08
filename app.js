const Discord = require('discord.js');
const fetch = require('node-fetch');
const nbaUtil = require('./util/nbaUtils.js')

const client = new Discord.Client();
const fetch = require('node-fetch');
const nbaUtil = require('./util/nbaUtils.js')

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
				console.log(response.league.standard);
				nbaData = response.league.standard
				console.log(nbaUtil.getTeamId(nbaData, "LeBron", "James"))
			})
			.catch(err => {
				console.log(`${err} Parse that json better boi`);
			})
		
	}

	if (message.content === 'days') {
		message.channel.send(nbaUtil.getDaysOfWeek());
	}

})

client.login(process.env.YAHOO_TOKEN);