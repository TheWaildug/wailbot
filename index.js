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
    client.user.setPresence({ activity: { name: 'Prefix: w!' }});
});

client.on('guildMemberAdd', member =>{
    console.log(`${member.displayName} joined the server.`)
    client.Commands.get('welcome').execute(member,Discord)
})

client.on('guildMemberRemove', member =>{
    console.log(`${member.displayName} left the server.`)
    client.Commands.get('goodbye').execute(member,Discord)
})
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(' | ');
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
       client.Commands.get('ping').execute(message,args);
    } 
    else if(command === 'kick'){
        client.Commands.get('kick').execute(message,args,Discord);
    }
    else if(command === 'ban'){
            client.Commands.get('ban').execute(message,args,Discord)
        }
    else if(command === 'unban'){
        client.Commands.get('unban').execute(message,args,Discord,client); 
    }
    else if(command === 'banmessage'){
        client.Commands.get('banmessage').execute(message,Discord)
    }
    else if(command === 'mute'){
        console.log(`mute command sent.`)
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permission.')
        const mentionmember = message.mentions.members.first();

        if(!mentionmember)return message.reply('You need to mention a member to mute!') ;
        console.log(mentionmember.displayName)  
        
        if(!mentionmember.kickable) return message.reply('This user cannot be muted!')
        const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole) return message.reply("I couldn't find the mute role!");
        
        if(!args[1]) return message.reply('Please have a reason!')
        const time = args[2]
        if(!time) return message.reply('Please specify a time!');
        if(mentionmember.roles.cache.some(role => role.name === 'Muted')) return message.reply("This user is already muted!")
        mentionmember.roles.add(muterole)
        .then(() =>  console.log(`Muted ${mentionmember.displayName}  for ${ms(ms(time))} by ${message.member.displayName} Reason: ${args[1]}`)) 
        message.channel.send(`Sucessfully muted ${mentionmember.displayName} for ${ms(ms(time))}. Reason: ${args[1]}`)
        mentionmember.send(`You have been muted in ${message.guild.name} for ${ms(ms(time))}. Reason: ${args[1]}`)
        const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
        if(channel){channel.send(`${mentionmember.displayName} has been muted by ${message.member.displayName} for ${time}. Reason: ${args[1]}`)}

        
           

        setTimeout(function(){
            mentionmember.roles.remove(muterole);
            if(channel){channel.send(`Auto Unmuted ${mentionmember.displayName}`)};
            console.log(`Auto Unmuted ${mentionmember.displayName}`)
            
        }, ms(time));
    }
    else if(command === 'unmute'){
        console.log('unmute command sent')
        const mentionMember = message.mentions.members.first();
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permission!')
        if(!mentionMember) return message.reply('You need to mention a member to UnMute!') ;
        const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole) return message.reply("I couldn't find the mute role!");
        if(!mentionMember.roles.cache.some(role => role.name === 'Muted')) return message.reply("This user isn't muted!")
        mentionMember.roles.remove(muterole)
        .then(() =>  console.log(`UnMuted ${mentionMember.displayName} by ${message.member.displayName}`)) 
        message.channel.send(`Sucessfully unmuted ${mentionMember.displayName}`)
        const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")

    }
    else if(command === 'invite'){
        console.log('invite command sent')
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have permission to do this!')
        message.channel.send('Invite the bot to your server! https://discord.com/oauth2/authorize?client_id=755781017889144903&scope=bot&permissions=8')
    }
});
 
client.login(process.env.token);
 
 
 
