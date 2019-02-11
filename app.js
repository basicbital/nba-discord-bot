const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const nbaUtil = require('./util/nbaUtils.js')
const nbaData = require('./api/nbaData.js')

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
	if (message.content === 'player') {
		let firstName = "Quinn";
		let lastName = "Cook";
		nbaData.getPlayers().then(
			resp =>{
				let teamId = nbaUtil.getTeamId(resp, firstName, lastName);
				nbaData.getTeamSchedule(teamId).then(resp => console.log(resp));
			}
		);


	}
})

client.login(process.env.YAHOO_TOKEN);

