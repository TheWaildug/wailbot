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
    else if(command === 'kick'){
       console.log('Kick Command Sent.') 
        if(!args[1]) return message.channel.send('You need to specify a player!');
        if(!args[2]) return message.channel.send('You need to have a reason!')
        const user = message.mentions.users.first();
        if(user){
            const member = member.guild.member(user);
            if(member){
                member.kick(`You were kicked from this server! Reason: ${args[2]}.`)
            }
        }
    } 
});
 
client.login(process.env.token);
 
 
 