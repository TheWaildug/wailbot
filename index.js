const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = 'w!';
 
const fs = require('fs');

const welcomeChannel = `hi-bye`

client.once('ready', () => {
    console.log('Wail Bot is online!');
    client.user.setStatus('online')
    client.user.setPresence({ activity: { name: 'Coming Soon...' }});
});

client.on('guildMemberAdd', member =>{
    console.log(`${member} joined the server.`)
    const channel = member.guild.channels.cache.find(channel => channel.name === `${welcomeChannel}`);
   if(!channel) return;
   channel.send(`Welcome to Fluff Studios ${member}! Please read ${ member.guild.channels.cache.get('721090307696885823').toString()}`); 
})

client.on('guildMemberRemove', member =>{
    console.log(`${member} left the server.`)
    const channel = member.guild.channels.cache.find(channel => channel.name === "hi-bye")
    if (!channel) return;
    channel.send(`It's sad to see you go ${member}.`)
})
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        console.log('Ping Command Sent.')
        return message.channel.send('Pong!');    
    }
});
 
client.login(process.env.token);
 
 
 