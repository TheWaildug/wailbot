const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require('ms');
const prefix = 'w!'

const Endb = require('endb');
const endb = new Endb('sqlite://thewaldugbot.sqlite')

const fs = require('fs');   
const { setTimeout } = require('timers');
const { normalize } = require('path');

client.Commands = new Discord.Collection();
keyv.on('error', err => console.error('Keyv connection error:', err));
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
client.on('voiceStateUpdate', (oldState, newState) => {
    console.log(newState.member.displayName)
    const generalchannel = newState.guild.channels.cache.find(c => c.name === 'General');
    const musicchannel = newState.guild.channels.cache.find(c  => c.name === 'Music');
    const role3 = newState.guild.roles.cache.find(r => r.name === 'Music')
    const role = newState.guild.roles.cache.find(r => r.name === 'General');
    if (newState.channelID === generalchannel.id) { // Triggered when the user joined the channel we tested for
        console.log('new general state correct')
        
        if(!role) return;
        if(!newState.member.roles.cache.some(role => role.name === "General")) newState.member.roles.add(role); // Add the role to the user if they don't already have it
      
    }   
    if(newState.channelID === musicchannel.id){
        console.log('new music state correct')
       
        if(!role3) return;
        if(!newState.member.roles.cache.some(role => role.name === 'Music')) newState.member.roles.add(role3);
      
    }
    if(oldState.channelID === musicchannel.id){
        console.log('old music state correct')
        if(!role3) return;
        if(newState.member.roles.cache.some(role => role.name === "Music")){
            newState.member.roles.remove(role3)
        };
      
    }
    if(oldState.channelID === generalchannel.id){
        console.log('old genearl state correct')
       
        if(!role) return;
        if(newState.member.roles.cache.some(role => role.name === 'General')){ 
        
            newState.member.roles.remove(role)
    
        };
              
    }
});
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(' | ');
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
       client.Commands.get('ping').execute(message,args);
    } 
    if(command === 'membercount'){
        console.log('membercount command sent')
        message.channel.send('The current member count is ' + `${message.guild.memberCount.toLocaleString()}`)
    }
    else if(command === 'kick'){
        client.Commands.get('kick').execute(message,args,Discord);
    }
    else if(command === "restrict"){
        client.Commands.get('restrict').execute(message,args,Discord)
    }
    else if(command === "unrestrict"){
        client.Commands.get('unrestrict').execute(message,args,Discord)
    }
    else if(command === 'slowmode'){
        client.Commands.get('slowmode').execute(message,args,Discord)
    }
    else if(command === 'ban'){
            client.Commands.get('ban').execute(message,args,Discord,keyv)
        }
    else if(command === 'unban'){
        client.Commands.get('unban').execute(message,args,Discord,client); 
    }
    else if(command === 'dm'){
        client.Commands.get('dm').execute(message,args)
    }

    else if(command === 'banmessage'){
        console.log('banmsg')

       if(message.member.id === '432345618028036097'){

        if(!args[0]) return message.channel.send('Format is: w!banmessage | See or BanMSG')
       var current = endb.get(message.guild.id)
            console.log('current await')
          
        if(args[0] === "See") return message.channel.send('Current ban message is: `' + current + '`')
        console.log(args[0])
        console.log('await')
        
        endb.set(message.guild.id,args[0])
        current = endb.get(message.guild.id)
            console.log('current await')
     
        
        message.reply('Sucessfully changed ban message to `' + current + '`')
        
       
        console.log(current)
        
        console.log(message.author.tag)
       
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Utility')
        .setDescription("Ban MSG Change")
        .addFields(
            { name: "Sender:", value: `<@${message.member.id}>` },
            { name: 'New Message: ', value: `${current}`},   
        )
        .setTimestamp();
        
        const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
        if(!channel) return;
        channel.send(exampleEmbed)
        return
       } 
       else {return message.reply('Sorry buddy but you need to be the user <@432345618028036097>')}
    }

    else if(command === 'mute'){
       client.Commands.get('mute').execute(message,args,Discord,ms)
    }
    else if(command === 'unmute'){
        console.log('unmute command sent')
        const mentionMember = message.mentions.members.first();
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You must have the permission `KICK_MEMBERS`.')
        if(!args[0]) return message.channel.send('Format is: w!unmute | @USER ')
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
        if(message.member.id === '432345618028036097') {
            message.member.send('Invite the bot to your server! https://discord.com/oauth2/authorize?client_id=755781017889144903&scope=bot&permissions=8')
            return;   
        }

        
    }  else {return message.reply('You must be the user <@432345618028036097>   .')}
});

client.login(process.env.token);
