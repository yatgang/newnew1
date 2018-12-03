const Discord = require('discord.js');
const PastebinAPI = require('pastebin-js');
const bot = new Discord.Client();

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
});

const pastebin = new PastebinAPI('c0433c6e1f136b822e5f467af732319c');
var cantsend = [];
var canTimerResetKey = true;
var twoaccounts = [];
var threeaccounts = [];

bot.on('message', (message) => {
	try {
		if (message.content === '!gen') {

			message.reply('\n- !gen spotify - generate a spotify account\n');
		}

		if (message.content.startsWith("!gen")) {

			var sender = message.author;

			if (cantsend.includes(message.member.user.tag)) {

				message.reply("You're on cooldown using the gen, retry again in 2mins");
				return;

			}

			var cooldown = 30000;
			var twotimes = false;
			if (message.member.roles.find("name", "Customer")) {

				cooldown = 30000;
				twotimes = false;

			}
			if (message.member.roles.find("name", "Old member")) {

				cooldown = 0;
				twotimes = true;

			}
			if (twoaccounts.includes(message.member.user.tag)) {

				twotimes = true;
				var index = twoaccounts.indexOf(message.member.user.tag);
				if (index > -1) {
					twoaccounts.splice(index, 1);

				}

			}

			if (message.content.split(" ")[1] === "spotify") {
				pastebin.getPaste('AnQmTS1B').then(function (data) {
					var accounts = data.split('\n');
					sender.send("Spotify account: " + accounts[Math.floor(Math.random() * accounts.length)]);
					if (twotimes)
						sender.send("Spotify account: " + accounts[Math.floor(Math.random() * accounts.length)]);
				});
				cantsend.push(message.member.user.tag);
				setTimeout(function () {
					var index = cantsend.indexOf(message.member.user.tag);
					if (index > -1) {
						cantsend.splice(index, 1);
					}
				}, cooldown);
      } 
      if (message.content.split(" ")[1] === "Spotify") {
				pastebin.getPaste('AnQmTS1B').then(function (data) {
					var accounts = data.split('\n');
					sender.send("Spotify account: " + accounts[Math.floor(Math.random() * accounts.length)]);
					if (twotimes)
						sender.send("Spotify account: " + accounts[Math.floor(Math.random() * accounts.length)]);
				});
				cantsend.push(message.member.user.tag);
				setTimeout(function () {
					var index = cantsend.indexOf(message.member.user.tag);
					if (index > -1) {
						cantsend.splice(index, 1);
					}
				}, cooldown);
		}

    }
		if (message.content.startsWith('!DEV INPUT:')) {

		}
	}
	catch (error) {


	}
});
bot.login('process.env.token');
