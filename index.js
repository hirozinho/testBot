const {prefix, token} = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).toLowerCase().split(/ +/);
    const command = args.shift().toLowerCase()

    if (command === `add`) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Add my bot to your server using the link below \nhttps://discordapp.com/oauth2/authorize?client_id=649644806443892745&scope=bot');
    } else if (command === `server`) {
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    } else if (command === 'item') {
        client.commands.get('item').execute(message, args);
    }

});

client.login(token);