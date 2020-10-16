const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = 'w!';

const ms = require('ms');

client.banmsg = new Map()

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
client.on('voiceStateUpdate', (oldState, newState) => {
    const generalchannel = newState.guild.channels.cache.find(c => c.name === 'General');
    if(!generalchannel) return;
    if (newState.channelID === generalchannel.id) { // Triggered when the user joined the channel we tested for
        console.log('new state correct')
        const role = newState.guild.roles.cache.find(r => r.name === 'General');
        if(!role) return;
        if (!newState.member.roles.cache.has(role)) newState.member.roles.add(role); // Add the role to the user if they don't already have it
        return;
    }
    if(oldState.channelID === generalchannel.id){
        console.log('old state correct')
        const role2 = newState.guild.roles.cache.find(r => r.name === "General");
        if(!role2) return;
        console.log('past role')
        if(newState.member.roles.cache.has(role2)){ 
            newState.member.roles.remove(role2)
            console.log('removed role')
        };
        console.log('returning')
        return;
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
        message.channel.send('The current member count is' + `${message.guild.memberCount.toLocaleString()}`)
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
    else if(command === 'ban'){
            client.Commands.get('ban').execute(message,args,Discord,client)
        }
    else if(command === 'unban'){
        client.Commands.get('unban').execute(message,args,Discord,client); 
    }
    else if(command === 'dm'){
        client.Commands.get('dm').execute(message,args)
    }
    else if(command === 'banmessage'){
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply('You must have the permission `ADMINISTRATOR`.');
            return;
        };
            console.log(`changing ban msg`)
            message.reply("See or Change?")
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 1000 });
            collector.on('collect',msg => {
                console.log('collecting...')
                if(msg.content === "See"){
                    console.log('see')
                    message.reply(`Your current ban message is: ${client.banmsg.get('banmsg')}`) 
                }
                if(msg.content === "Change"){
                    message.reply('Please tell me the new ban message.')
                    const collector2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {time: 1000});
                    collector2.on('collect',msg2 =>{
                        if(msg2.content === "Reset"){
                            msg2.reply('Resetting Ban Mesage...')
                            client.banmsg.set('banmsg',"");
                        } 
                        else{
                            msg2.reply(`You entered ${msg2.content}. Is that correct?`)
                            const collector3 = new Discord.MessageCollector(message.channels, m => m.author.id === message.author.id, {time: 1000});
                            collector3.on("collect",msg3 =>{
                                if(msg3.content === "Yes"){
                                    client.banmsg.set('banmsg',msg2.content)
                                    return msg3.reply(`Setting Ban Msg to ${msg2.content}.`)
                                }
                                else if(msg3.content === "No"){
                                    return msg3.reply('Please run the command again.')
                                }
                            })
                        }
                        
                    })
                }
            })
        }
    
    else if(command === 'mute'){
       client.Commands.get('mute').execute(message,args,Discord,ms)
    }
    else if(command === 'unmute'){
        console.log('unmute command sent')
        const mentionMember = message.mentions.members.first();
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You must have the permission `KICK_MEMBERS`.')
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
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You must have the permission `ADMINISTRATOR`.')
        message.channel.send('Invite the bot to your server! https://discord.com/oauth2/authorize?client_id=755781017889144903&scope=bot&permissions=8')
    }
});
 
client.login(process.env.token);