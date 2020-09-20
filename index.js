const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = 'w!';

const ms = require('ms');

const fs = require('fs');   
const { setTimeout } = require('timers');
 
client.Commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.Commands.set(command.name, command);
}


const welcomeChannel = `hi-bye`

client.once('ready', () => {
    console.log('Wail Bot is online!');
    client.user.setStatus('online')
    client.user.setPresence({ activity: { name: 'Coming Soon...' }});
});

client.on('guildMemberAdd', member =>{
    console.log(`${member.displayName} joined the server.`)
    const channel = member.guild.channels.cache.find(channel => channel.name === `${welcomeChannel}`);
   if(!channel) return;
   channel.send(`Welcome to Fluff Studios ${member}! Please read ${ member.guild.channels.cache.get('721090307696885823').toString()}`); 
})

client.on('guildMemberRemove', member =>{
    console.log(`${member.displayName} left the server.`)
    const channel = member.guild.channels.cache.find(channel => channel.name === "hi-bye")
    if (!channel) return;
    channel.send(`It's sad to see you go ${member}.`)
})
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
       client.Commands.get('ping').execute(message,args);
    } 
    else if(command === 'kick'){
      client.Commands.get('kick').execute(message,args); 
    }
    else if(command === 'ban'){
        client.Commands.get('ban').execute(message,args);  
    } 
    else if(command === 'unban'){
        client.Commands.get('unban').execute(message,args); 
    }
    else if(command === 'mute'){
        console.log(`mute command sent.`)
        const mentionmember = message.mentions.members.first();
        console.log(mentionmember.displayName)
        if(!mentionmember)return message.reply('You need to mention a member to mute!') ;

        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permission.')
        if(!mentionmember.kickable) return message.reply('This user cannot be muted!')
        const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole) return message.reply("I couldn't find the mute role!");
        
        if(!args[1]) return message.reply('Please have a reason!')
        const time = args[2]
        if(!time) return message.reply('Please specify a time!');

        mentionmember.roles.add(muterole)
        .then(() =>  console.log(`Muted ${mentionmember.displayName}  for ${ms(ms(time))} by ${message.member.displayName} Reason: ${args[1]}`)) 
        message.channel.send(`Sucessfully muted ${mentionmember.displayName} for ${ms(ms(time))}. Reason: ${args[1]}`)
        mentionmember.send(`You have been muted in ${message.guild.name} for ${ms(ms(time))}. Reason: ${args[1]}`)
        .catch(console.error);    

        setTimeout(function(){
            mentionmember.roles.remove(muterole);
            message.channel.send(`Auto Unmuted ${mentionmember.displayName}`)
        }, ms(time));
    }
    else if(command === 'unmute'){
        console.log('unmute command sent')
        const mentionMember = message.mentions.member.first();
        if(!mentionMember) return message.reply('You need to mention a member to UnMute!') ;
        const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole) return message.reply("I couldn't find the mute role!");
        mentionmember.roles.remove(muterole)
        .then(() =>  console.log(`UnMuted ${mentionmember.displayName} by ${message.member.displayName}`)) 
        message.channel.send(`Sucessfully unmuted ${mentionmember.displayName}`)
        .catch(console.error);    
    }
});
 
client.login(process.env.token);
 
 
 