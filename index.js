
const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require("ms");
const prefix = "w!";
const Database = require("@replit/database")
const db = new Database()
const fs = require("fs");
const mongoose = require('mongoose')
const { setTimeout } = require("timers");
const { normalize } = require("path");
const express = require('express');
const keepAlive = require('./server');  
const data = require("@replit/database");
const database = new data();
var on = false
const { ReactionRoleManager } = require('discord.js-collector');
const reactionRoleManager = new ReactionRoleManager(client, {
    storage: true, // Enable reaction role store in a Json file
    path: __dirname + '/roles.json', // Where will save the roles if store is enabled
    mongoDbLink: process.env.MONGO // See here to see how setup mongoose:   
});
client.Commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.Commands.set(command.name, command);
}
async function getData(key){
  console.log('async data get function recieved')
  console.log(key)
  const data = await database.get(key);
  console.log(data)
  return data
}
const roles = require("./roles")
function isbypasses(user) {
 for (var i = 0; i < roles.length; i++) {
  
   if(user.roles.cache.find(r => r.id == roles[i])){
     return true
   }
 }
 return false
}
async function blacklist(message,args){
  let user
   if(message.mentions.members.first()){
      user = message.mentions.members.first()
    }else if(!message.mentions.members.first()){
      console.log(args[0])
      user = await getmember(client,args[0])

    }
    console.log(user)
    if(!user){
      return message.reply('Please specify a user or their id.')
    }
  const isblack = await ree(`IsBlacklisted-${user.id}`)
  if(isblack !== null){
    await removeData(`IsBlacklisted-${user.id}`).then(() =>{
      return message.reply(`Successfully unblacklisted <@${user.id}>.`)
    })
  }else if(isblack == null){
    await setData(`IsBlacklisted-${user.id}`,true).then(() =>{
      return message.reply(`Sucessfully blacklisted <@${user.id}>`)
    })
  }
}
async function makeSuggestion(message){
  var suggestion
   const isblack = await ree(`IsBlacklisted-${message.member.id}`)
    console.log(isblack)
    if(isblack !== null)    { return message.reply('You have been blacklisted from making suggestions!')
    }
    console.log('ok')
        message.reply("Please reply with your suggestion.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', msg => {
          console.log("stupid msg.content " + msg.content)
          console.log('entered thingy')
          if(msg.content.toLowerCase() === "cancel"){
            return msg.reply('Canceling...')
          }
          collector.on('end', collected => {
	console.log(`Collected ${collected.size} items`);
  
            msg.reply(`You have entered ${msg.content} . Is that correct? (Yes or No)`);
            const collector2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
            collector2.on('collect', async (mg) =>{
              console.log("collect 2 " + mg.content)
             
                  if(mg.content.toLowerCase() === "yes"){
                    mg.reply('attemping to send suggestion.')
                    suggestion = msg.content
  console.log('suggestion function sent')
  const guild = client.guilds.cache.get('755849256220229632');
  if(!guild) return console.warn('Cannot find guild!')
  const channel = guild.channels.cache.find(c => c.id === '774800635408154644')
  if(!channel) return console.warn('Cannot find channel!')
  var suggestionId = await ree('SuggestionId')
  if(suggestionId === null){
    suggestionId = "1"
    setData('SuggestionId',"1")
  }
  console.log(suggestionId)
   const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Suggestions")
      .setDescription(`New Suggestion from <@${message.member.id}>`)
      .addFields(
        { name: "Suggestion: ", value: `${suggestion}`},
        { name: "Guild: ", value: `${message.guild}` },

      )
      .setTimestamp()
      .setFooter(`Suggestion ID: ${suggestionId}.`)
      .setColor('#1aff1a');
     channel.send(exampleEmbed).then(sentEmbed => {
    sentEmbed.react("👍")
    sentEmbed.react("👎")
    setData('SuggestionId',Number(suggestionId) + 1)
})
              }else if(mg.content.toLowerCase() === "no")
              return mg.reply('run this command again.')
      
           
              })
             
});
        })
  
 
}

async function run(key,message) {
  console.log('run function')
  const data = await getData(key);
  console.log('eeee: ' + data); // will print your data
  if(message){
  return message.reply("Here's the data I found from the key " + key + ", " +   data)
  }
}

async function ree(key){
   console.log('ree function')
  const data = await getData(key);
  console.log('eeeewrwe:' + data); // will print your data
  return data
}
async function IsMuted(user,guild){
  const muted = await getData(`Guild-${guild}-IsMuted-${user}`)
  console.log(muted)
  if(muted != null){
    return true
  } else if(muted == null){
    return false
  }
}

async function removeData(key,message){
  console.log('remove data')
  database.delete(key)
  if(message){
    return message.reply(`Sugessfully removed the key ${key}.`)
  }
}
async function run2(key,message) {
  console.log('run2 function')
  const data = await getData(key);
  console.log(': ' + data); // will print your data
   if(message){
  return message.reply("Sucessfully changed the data with the key " + key + ", to " +   data)
   }
}

async function setData(key,data,message){
  console.log('async data set function recieved')
  console.log(key)
  console.log(data)
 await database.set(key,data);
 run2(key,message)
}

const swears = require("./swears")
const slurs = require("./slurs")
const asked = require('./asked')

      const quotes = require("./quotes")
const funfacts = require("./facts")


const welcomeChannel = `hi-bye`;




function Online(){
 console.log("Wail Bot is online!")
  client.user.setPresence({ activity:  { name: "bit.ly/thewaildug", type: 'WATCHING' } });

}
client.on("ready", async () => {
  console.log('starting up...')
   client.user.setPresence({ activity:  { name: "Myself Start Up...", type: 'WATCHING' } });
setTimeout(Online, 10000)
 
});

// When is ready, reation role manager will emit this event
reactionRoleManager.on('ready', () => {
    console.log('Reaction Role Manager is ready!');
});

// When user react and win role, will trigger this event
reactionRoleManager.on('reactionRoleAdd', (member, role) => {
    console.log(member.displayName + ' got the role ' + role.name)
});
// When user remove reaction and lose role, will trigger this event
reactionRoleManager.on('reactionRoleRemove', (member, role) => {
    console.log(member.displayName + ' lost the role ' + role.name)
});
// When someone removed all reactions from message
reactionRoleManager.on('allReactionsRemove', (message) => {
    console.log(`All reactions from message ${message.id} was removed, all roles were taken and reactions roles deleted.`)
});
// If member doesn't have all requirements, this event is triggered.
reactionRoleManager.on('missingRequirements', (type, member, reactionRole) => {
    console.log(`Member '${member.id}' will not get role '${reactionRole.role}', because they don't have the requirement ${type}`);
});

client.on("messageUpdate", (oldMessage, message) => {
  if(oldMessage.guild == null){
  return;
}
    if(oldMessage.content == message.content){
      return;
    }

    if(message.author.bot){
      return;
    }
    if(oldMessage.content && message.content){
      console.log(`Message updated by ${message.member.user.tag} in the channel ${oldMessage.channel.name}. Old Message ${oldMessage.content}. New Message ${message.content}.`)
  for (var i = 0; i < slurs.length; i++) {
      if (message.content.toLowerCase().includes(slurs[i])) {
   
        if (isbypasses(message.member)) {
          return console.log("this dude is important");
        }
        if (message.member.bot) {
          return console.log("boobies bot");
        }
             console.log(message.content)
        console.log("this man said a naughty slur!");
        console.log(message.member.user.tag);
        console.log(slurs[i]);
        console.log(message.content);
        const embed = new Discord.MessageEmbed()
          .setTitle(`You're not allowed to say that!`)
          .setColor(FF000)
          .setDescription(
            `Slurs are not allowed here. Your message has just been sent to Server Staff and will be acted upon shortly.`
          );
        message.channel.send(`<@${message.member.id}>`,embed);
        
        message.delete();
        break;
      }
    }
  }
  if(!oldMessage.content && message.content){
    console.log(`Message Update by ${message.member.user.tag}. Old Message could not be found or is an image. New Message ${message.content}`)
     for (var i = 0; i < slurs.length; i++) {
      if (message.content.toLowerCase().includes(slurs[i])) {
       
        if (isbypasses(message.member)) {
          return console.log("this dude is important");
        }
        if (message.member.bot) {
          return console.log("boobies bot");
        }
            console.log(message.content)
        console.log("this man said a naughty slur!");
        console.log(message.member.user.tag);
        console.log(slurs[i]);
        console.log(message.content);
        const embed = new Discord.MessageEmbed()
          .setTitle(`You're not allowed to say that!`)
          .setColor(FF000)
          .setDescription(
            `Slurs are not allowed here. Your message has just been sent to Server Staff and will be acted upon shortly.`
          );
        message.channel.send(`<@${message.member.id}>`,embed);
        
        message.delete();
        break;
      }
    }
  }
});
client.on("guildMemberAdd", async (member) => {
  if(member.bot) return;
    console.log(`${member.displayName} joined the server.`);
 if(await IsMuted(member.id,member.guild.id)){
     const muted = member.guild.roles.cache.find(r => r.name === "Muted")
     if(muted){
       member.roles.add(muted,"Member was muted before they left.")
     }
   }
  if(member.id === '745325943035396230'){
    const role = member.guild.roles.cache.find(r => r.name === 'Testing Account')
    const role2 = member.guild.roles.cache.find(r => r.name === "Verified")
   
    if(!role && !role2) return;
    if(role){
    member.roles.add(role,'User is CoolGuy1146 which is a testing account.');}
    if(role2){
    member.roles.add(role2,'User is CoolGuy1146 which is a testing account.')}

  }
  client.Commands.get("welcome").execute(member, Discord);
});
client.on('guildMemberRemove', async member => {
  if(member.bot) return;
    console.log(`${member.displayName} left the server.`);
client.Commands.get("goodbye").execute(member, Discord);
  
});

 async function getmember(Client,id){
        let member = await Client.users.fetch(id);
        return member
  }


client.on("voiceStateUpdate", (oldState, newState) => {
  console.log(newState.member.displayName);
  const generalchannel = newState.guild.channels.cache.find(
    c => c.name === "General"
  );
  const musicchannel = newState.guild.channels.cache.find(
    c => c.name === "Music"
  );
  const role3 = newState.guild.roles.cache.find(r => r.name === "Music");
  const role = newState.guild.roles.cache.find(r => r.name === "General");
  if (newState.channelID === generalchannel.id) {
    // Triggered when the user joined the channel we tested for
    console.log("new general state correct");

    if (!role) return;
    if (!newState.member.roles.cache.some(role => role.name === "General"))
      newState.member.roles.add(role,"Joined General VC"); // Add the role to the user if they don't already have it
  }
  if (newState.channelID === musicchannel.id) {
    console.log("new music state correct");

    if (!role3) return;
    if (!newState.member.roles.cache.some(role => role.name === "Music"))
      newState.member.roles.add(role3,"Joined Music VC");
  }
  if (oldState.channelID === musicchannel.id) {
    console.log("old music state correct");
    if (!role3) return;
    if (newState.member.roles.cache.some(role => role.name === "Music")) {
      newState.member.roles.remove(role3,"Left Music VC");
    }
  }
  if (oldState.channelID === generalchannel.id) {
    console.log("old genearl state correct");

    if (!role) return;
    if (newState.member.roles.cache.some(role => role.name === "General")) {
      newState.member.roles.remove(role,"Left General VC");
    }
  }
});


client.on("message", async message =>{
 

  for (var i = 0; i < asked.length; i++) {
  if (message.content.toLowerCase().includes(asked[i])){
      message.channel.send(`<@${message.member.id}>`,{files: ["https://cdn.discordapp.com/attachments/772633298060181514/779072849088479252/Demoman_does_not_care_if_you_didnt_ask.mp4"]} )
      break;
  }}
})
client.on("message", async message =>{
  
  var cont = true
  for (var i = 0; i < slurs.length; i++) {
  if (message.content.toLowerCase().includes(slurs[i])) {
    const bypass = message.channel.guild.roles.cache.find(r => r.name === 'Moderation Bypass')
    const bypass2 = message.channel.guild.roles.cache.find(r => 
 r.name === '(🤖) Bots' || r.name === 'Bots')
 if(bypass){
 if(message.member.roles.cache.some(role => role.id === bypass.id )){
     cont = false
   }
 }
 if(bypass2){
  if(message.member.roles.cache.some(role => role.id === bypass2.id )){
     cont = false
   }
 }
 if(cont === true){
    console.log('This naughty boy has some unholy words in his message!')
    const embed = new Discord.MessageEmbed()
      .setTitle(`You're not allowed to say that!`)
      .setColor(0xff0000)
      .setDescription(
        `Racial slurs are not allowed here. Your message have been logged.`
      );
    message.channel.send(`<@${message.member.id}>`)
    message.channel.send(embed);
    message.delete();
    // message.content contains a forbidden word;
    // delete message, log, etc.
    break;
  }}
}
 for (var i = 0; i < swears.length; i++) {
    if (message.content.toLowerCase().includes(swears[i])) {
       const bypass = message.channel.guild.roles.cache.find(r => r.name === 'Moderation Bypass')
    const bypass2 = message.channel.guild.roles.cache.find(r => 
 r.name === '(🤖) Bots' || r.name === 'Bots')
 if(bypass){
 if(message.member.roles.cache.some(role => role.id === bypass.id )){
     cont = false
   }
 }
 if(bypass2){
  if(message.member.roles.cache.some(role => role.id === bypass2.id )){
     cont = false
   }
 }
 if(cont === true){
      console.log("this man said a naughty word!");
      const embed = new Discord.MessageEmbed()
        .setTitle(`You're not allowed to say that!`)
        .setColor(0xff0000)
        .setDescription(
          `NSFW or sexual references are not allowed here. Your message has been logged.`
        );
      message.channel.send(`<@${message.member.id}>`);
      message.channel.send(embed);
      message.delete();
      break;
    }
    }
  }
})

client.on("message", async  message => {
   if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  if(command === "announcement"){
    console.log('announcement command')
    if(message.channel.guild.id === '458742741568847904'){
      console.log('announcement command sent')
      const role = message.guild.roles.cache.find(r => r.id === '760532530616205383')
      if(role){
        if(!message.member.roles.cache.some(r => r.id === role.id)){
           message.member.roles.add(role,"Given with the !announcement command.")
           const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#1aff1a")
      .setTitle("Announcement Role")
      .setDescription(`Sucessfully given **${message.member.displayName}** the Announcement Role!`)
      .setTimestamp();
      
      message.channel.send(exampleEmbed)
        }else if(message.member.roles.cache.some(r => r.id === role.id)){
        message.member.roles.remove(role,"Removed with the !announcement command.")
        const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#1aff1a")
      .setTitle("Announcement Role")
      .setDescription(`Sucessfully removed **${message.member.displayName}**'s Announcement Role!`)
      .setTimestamp();
    
     message.channel.send(exampleEmbed)
      }
      }
    }
  }else if(command === "social"){
     console.log('social command')
    if(message.channel.guild.id === '458742741568847904'){
      console.log('social command sent')
      const role = message.guild.roles.cache.find(r => r.id === '760531989555314709')
      if(role){
        if(!message.member.roles.cache.some(r => r.id === role.id)){
           message.member.roles.add(role,"Given with the !social command.")
           const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#1aff1a")
      .setTitle("Social Media Role")
      .setDescription(`Sucessfully given **${message.member.displayName}** the Social Media Role!`)
      .setTimestamp();
      
      message.channel.send(exampleEmbed)
        }else if(message.member.roles.cache.some(r => r.id === role.id)){
        message.member.roles.remove(role,"Removed with the !social command.")
        const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#1aff1a")
      .setTitle("Social Media Role")
      .setDescription(`Sucessfully removed **${message.member.displayName}**'s Social Media Role!`)
      .setTimestamp();
    
     message.channel.send(exampleEmbed)
      }
      }
    }
  }
})
async function rrremove(message,args){
    if(message.member.id != "432345618028036097"){
   return message.reply("bro no just no.")
  }
       const emoji = args[0];
        if (!emoji)
            return message.reply('You need use a valid emoji.')

        const msg = await message.channel.messages.fetch(args[1]).catch(error =>{
          console.warn('Error: ' + error)
          cont = false
          return message.reply('Something went wrong! `' + error + "`")
        })
        if (!msg)
            return message.reply('Message not found! ')

        await reactionRoleManager.deleteReactionRole({message: msg, emoji})
        message.reply('I tried to remove it. You will have to manually remove the emoji though.')
}
async function rr(message,args){
  var cont = true
 const role = message.mentions.roles.first();
        if (!role)
            return message.reply('w!reactionroles @Role :emoji: messageid ')

        const emoji = args[1];
        if (!emoji)
            return message.reply('You need use a valid emoji.')

        const msg = await message.channel.messages.fetch(args[2] || message.id).catch(error =>{
          console.warn('Error: ' + error)
          cont = false
          return message.reply('Something went wrong! `' + error + "`")
        })
        if(cont != true){
          return;
        }
        reactionRoleManager.createReactionRole({
            message: msg,
            role,
            emoji
        });
        message.reply('Done')
    } 
  
client.on("message", async message => {
   var cont = true
  if(message.mentions.members){

  
   if (message.mentions.members.first()) {
    console.log("mention thingy");
    const user = message.mentions.members.first();
    if (on === true) {
      cont = false
    }
    console.log(message.member.id)
    console.log(message.member.displayName)
    console.log(user.id);
    console.log(user.displayName)
    if(message.author.bot) { 
      console.log('this a bot bro')
      cont = false}
      if(cont == true){
getData(`Guild-${message.guild.id}-IsAfk-${user.id}`).then(afk => {
    if(afk != null){
        message.reply(user.user.tag + ' is AFK with the AFK `' + afk + '`')
      }
      })
      }
     
    const role = message.channel.guild.roles.cache.find(r => r.name === 'Moderation Bypass')
    const role2 = message.channel.guild.roles.cache.find(r => r.name === 'I can ping TheWaildug!')
    if(role2){
    if(message.member.roles.cache.find(r => r === role2)){
      console.log('this cool dude can ping that froggo')
      cont = false
    }
  }
  if(role){
    console.log(role.name)
    if(message.member.roles.cache.find(r => r === role)){
      console.log('this dude got a cool role')
      cont = false
    }
  }
  
    if (user.id === "432345618028036097" && cont === true) {
      on = true;
      console.log("this stupid idiot got pinged");
      const embed = new Discord.MessageEmbed()
        .setTitle("You're not allowed to do that!")
        .setColor(0xff0000)
        .setDescription(
          `You're not allowed to ping TheWaildug in chat. Continuing will result in a mute.`
        );
        message.channel.send(`<@${message.member.id}>`)
      message.reply(embed);
      message.delete().then(() =>{
        console.log('deleted')
      })
    on = false;
    }
   }
}
  if(message.guild == null){
    if(message.author.id === '755781017889144903') {return;}
    getmember(client,message.author.id).then(member =>{
   
    const guild = client.guilds.cache.find(g => g.name === 'TheWaildug Bot Testing Server')

    if(guild){
      const channel = guild.channels.cache.find(c => c.name === "user-dm-logs")
    
    if(channel){
      if(message.attachments.size > 0){
        console.log('attach')
       
      message.attachments.forEach(att => {
        console.log(att.url)
        channel.send(`Attachment from ` + member.username + ' ', {files: [att.url]});
      })
      }
      if(message.content){
        console.log('content')
         console.log('Author: ' + member.username + '. Message: ' + message.content)
     const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("DM LOGS")
      .setDescription("New DM to <@755781017889144903>!")
      .addFields(
        { name: "User", value: `<@${member.id}>` },
        { name: "Message: ", value: `${message.content}` }
      )
      .setTimestamp();
      
      channel.send(exampleEmbed)
     
    }}
    }
  })
}
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.Commands.get("ping").execute(message, args,funfacts, quotes,Discord);
  }else if (command === "membercount") {
    console.log("membercount command sent");
    let memberCount = message.channel.guild.members.cache.filter(member => !member.user.bot).size;
    message.channel.send(
      "The current member count is `" +
        `${memberCount}` + "`"
    );
  

    }else if(command === 'reactionroles') {
      if(message.member.id != "432345618028036097"){
        return message.reply('sorry buddy but you have to be <@432345618028036097>.')
      }
      rr(message,args)
      }
      else if(command === "rrremove"){
        rrremove(message,args)
      }else if(command === 'database'){
    console.log('database command sent')
    if(message.member.id != "432345618028036097") return message.reply('You must be <@432345618028036097>!')
    if(!args[0]) return message.reply('w!database See/Change} {Key} {Data (only for changing)} ');
    if(args[0] === "See"){
      if(!args[1]) return message.reply('Please specify a key.')
      console.log(args[1])
 return run(args[1],message)
 
    } else if(args[0] === "Change"){
       if(!args[1]) return message.reply('Please specify a key.')
       console.log(args[1])
       if(!args[2]) return message.reply('Please specify some data.')
       console.log(args[2])
     return setData(args[1],args[2],message)
    
    }else if(args[0] === "Remove"){
      if(!args[1]) return message.reply("Please specify a key!")
      console.log(args[1])
      return removeData(args[1],message)
    }
  
    
      }else if(command === "lockdown"){
        var channelslocked = 0
        if(!message.member.hasPermission("MANAGE_CHANNELS")){
          return message.reply('You must have the permission `MANAGE_CHANNELS`')
        }
        console.log('lockdown command sent.')

      const channels = message.guild.channels.cache.filter(c => c.type=='text');

    

      var i
      var e = ""
    for (i = 0; i < args.length; i++) {
    if(i >= "0"){
      e = e + args[i] + " "
    }
  }
  args[1] = e
    if(!args[1]){
      args[1] = "This channel has been locked. You cannot chat here."
    }

  console.log(args[1])
      const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")
      if(!args[1]){
        args[1] = "This channel has been locked. You cannot chat here."
      }
    
var perhaps = false
  channels.forEach(channel =>{
    var cont = true
  let canchat = channel.permissionsFor(everyone).serialize();
    if(canchat.SEND_MESSAGES == false){
      cont = false
      }
      if(cont != true){
        return;
      }      console.log('idk man')

      channel
        .updateOverwrite(everyone, {

          SEND_MESSAGES: false,
        },`This has been changed by ${message.member.displayName} with the w!lockdown command.`)
        .catch(error => {
          console.warn("Error " + error);
          cont = false;
          return message.reply("Something went wrong! `" + error + "`");
        }).then(() =>{
          perhaps = true
           channelslocked = channelslocked + 1
      console.log('Successfully locked the channel ' + channel.name)
        const embed = new Discord.MessageEmbed()
        .setTitle("This channel has been locked.")
        .setColor(0xff0000)
        .setDescription(args[1]);
        channel.send(embed)
        console.log(channelslocked)
     message.channel.send("Locked 1 more channel <#" + channel + ">. There's now " + channelslocked + " channels locked.")
     
  })
      })
    if(perhaps == false){
      return message.reply('I cannot lock any current channels. Try to unlock some before running this again.')
    }
      } else if(command === "pin"){
     var cont = true
    console.log('pin command sent')
    if(!args[0]){
      message.reply('bro you need a message id to pin. ')
    }
    const msg = await message.channel.messages.fetch(args[0] || message.id).catch(error =>{
          console.warn('Error: ' + error)
          cont = false
          return message.reply('Something went wrong! `' + error + "`")
        })
    if(cont != true){
      return;
    }
    var yes = false
    var pleasestop = false
    var endloop = false
   if(msg){
     const perms = message.member.permissionsIn(msg.channel).toArray();
  perms.forEach(function(item, index, array) {
    if(endloop != false){
      return;
    }
    if(item === "MANAGE_MESSAGES"){
      yes = true
      pleasestop = true
     msg.pin().catch(error =>{
        console.warn('Error: ' + error)
       endloop = true
          return message.reply('Something went wrong! `' + error + "`")
      }).then(() => {
       endloop = true
       
      return message.reply('I attempted to pin it!')

      })
    }
  })
if(yes != true){
  return message.reply("pretty sure you're not allowed to do that but okay.")
}
   }
  }else if(command === "guilds"){
       
    if(message.member.id != "432345618028036097"){
      return message.reply("I don't think I'm going to let you do this. This will seriously flood the chat.")
    }
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
    message.reply('Are you 100% sure you want to flood the chat?')
    collector.on("collect", msg => {
      if(msg.content.toLowerCase() == "yes"){
         collector.on('end', collected => {
	console.log(`Collected ${collected.size} items`)});
        const guilds = client.guilds
     guilds.cache.forEach(guild => {
       console.log(guild.name)
     message.channel.send(guild.name)
   })
      }else if(msg.content.toLowerCase() == "no"){
        collector.on('end', collected => {
	console.log(`Collected ${collected.size} items`)});
        message.reply('good choice.')
      }
    })
    }else if(command === "message"){
      console.log('message command sent')
       if(!message.member.id == "432345618028036097" ){
      return message.reply("I don't think I'm going to let you do this.")}
       var channel,mentionchannel

    var cont = true;
    if (message.mentions.channels.first()) {
      channel = mentionchannel = message.mentions.channels.first();
    } else {
      channel = mentionchannel = message.channel.guild.channels.cache.find(
        r => r.id === args[0]
      );
    }
    if (!channel && mentionchannel) {
      message.reply("please # a channel or enter its ID .");
      cont = false;
    }
    if (cont == false) {
      return;
    }
    console.log(channel.name);
    var i
    var e = ""
   for (i = 0; i < args.length; i++) {
  if(i == "0"){
    
  }
  if(i >= "1"){
    e = e + " " + args[i]
  }
}
    
    const msg = e
    if(!msg){
      return message.reply('bro I need a message!')
    }
    console.log(msg)
    channel.send(msg)
    message.reply('Successfully sent a message to <#' + channel.id + '>')
    }else if(command === 'invite'){
    if(message.member.id === '432345618028036097'){
      console.log('invite command sent ')
      return message.member.send("Here's the invite Mr. Frog. https://discord.com/oauth2/authorize?client_id=755781017889144903&scope=bot&permissions=8")
    } else {
      return message.reply("Lol you trying to steal my bot? I don't think so.")
    }
  } else if(command === "support"){
    console.log('support command sent.')
    message.reply('Here is the bot support server: https://discord.gg/nfMfna3')
    }else if(command === 'fact'){
client.Commands.get('fact').execute(message,funfacts,Discord)
  } else if (command === "lock") {
    
    console.log("lock em down");
    var channel;

    var cont = true;
    if (message.mentions.channels.first()) {
      channel = message.mentions.channels.first();
    } else {
      channel = message.channel.guild.channels.cache.find(
        r => r.id === args[0]
      );
    }
    if (!channel) {
      message.reply("please # a channel or enter its ID .");
      cont = false;
    }
    if (cont == false) {
      return;
    }
    console.log(channel.name);
     var i
    var e = ""
   for (i = 0; i < args.length; i++) {
  if(i >= "1"){
    e = e + args[i] + " "
  }
}
args[1] = e
     var yes = false
console.log(args[1])
    const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")
    if(!args[1]){
      args[1] = "This channel has been locked. You cannot chat here."
    }
     let canchat = channel.permissionsFor(everyone).serialize();
    if(!canchat.SEND_MESSAGES){
      yes = false
      cont = false
      return message.reply("bro they already can't chat here.")
    }
       const perms = message.member.permissionsIn(channel).toArray()

    perms.forEach(function(item, index, array) {
  console.log(item, index)
  if(item === "MANAGE_MESSAGES"){
    console.log('idk man')
    yes = true
     const everyone = message.channel.guild.roles.cache.find(
      r => r.name === "@everyone"
    );
    channel
      .updateOverwrite(everyone, {

        SEND_MESSAGES: false,
      },`This has been changed by ${message.member.displayName}`)
      .catch(error => {
        console.warn("Error " + error);
        cont = false;
        return message.reply("Something went wrong! `" + error + "`");
      }).then(() =>{
      message.reply('successfully locked the channel <#' + channel.id + '>')
      const embed = new Discord.MessageEmbed()
      .setTitle("This channel has been locked.")
      .setColor(0xff0000)
      .setDescription(args[1]);
      channel.send(embed)
    })
  }
})
    if(yes === false){
      return message.reply('dude you cannot do this!')
    }
  }else if(command == "afk"){
   console.log('afk command sent')
    var e = "";
    for (var i = 0; i < args.length; i++) {
      
        e = e + args[i] + " ";
  
    }
    if(!e){
      e = "AFK"
    }
    args[0] = e;
    console.log(args[0]);
    message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(error =>{
      console.log('Something went wrong! Error: ' + error)
    }).then(() => {
      message.reply("I set your AFK `" + args[0] + "`")
      setData(`Guild-${message.guild.id}-IsAfk-${message.member.id}`,args[0])
    })
 }else if (command === "unlock") {
    
    console.log("unlock em down");
    var channel;

    var cont = true;
     var yes = true
    if (message.mentions.channels.first()) {
      channel = message.mentions.channels.first();
    } else {
      channel = message.channel.guild.channels.cache.find(
        r => r.id === args[0]
      );
    }
    if (!channel) {
      message.reply("please # a channel or enter its ID .");
      cont = false;
    }
    if (cont == false) {
      return;
    }
    console.log(channel.name);
       var i
    var e = ""
   for (i = 0; i < args.length; i++) {
  if(i >= "1"){
    e = e + args[i] + " "
  }
}
args[1] = e
console.log(args[1])
    const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")
    if(!args[1]){
      args[1] = "This channel has been unlocked. You can now chat here."
    }
      let canchat = channel.permissionsFor(everyone).serialize();
    if(canchat.SEND_MESSAGES == null || canchat.SEND_MESSAGES == true){
      yes = false
      cont = false
      return message.reply("bro they already can chat here.")
    }
    const perms = message.member.permissionsIn(channel).toArray()
if(cont == false){
  return;
}
    perms.forEach(function(item, index, array) {
      if(yes === false){
return;      }
  if(item === "MANAGE_MESSAGES"){
    console.log('perhaps')
    yes = false
     const everyone = message.channel.guild.roles.cache.find(
      r => r.name === "@everyone"
    );
    channel
      .updateOverwrite(everyone, {

        SEND_MESSAGES: null,
      },`This has been changed by ${message.member.displayName}`)
      .catch(error => {
        console.warn("Error " + error);
        cont = false;
        return message.reply("Something went wrong! `" + error + "`");
      }).then(() =>{
      message.reply('successfully unlocked the channel <#' + channel.id + '>')
      const embed = new Discord.MessageEmbed()
      .setTitle("This channel has been unlocked.")
      .setColor(0xff0000)
      .setDescription(args[1]);
      channel.send(embed)
      return;
    })  
  }
})  
    if(yes == true){
      console.log('just no')
      return message.reply('dude you cannot do this! ')
    }
  } else if(command === 'quote'){
      console.log('quote command')
    client.Commands.get('quote').execute(message,quotes,Discord)
  }else if(command === "suggest"){
    console.log('suggest command sent')
    makeSuggestion(message)
  }else if (command === "kick") {
    client.Commands.get("kick").execute(message, args, Discord,client);
  } else if (command === "restrict") {
    client.Commands.get("restrict").execute(message, args, Discord,client);
  } else if (command === "unrestrict") {
    client.Commands.get("unrestrict").execute(message, args, Discord,client);
  } else if(command === "random"){
client.Commands.get('random').execute(message,args,Discord)
  }else if(command === 'nickname'){
    console.log('pee pee poo poo')
    client.Commands.get('nickname').execute(message,args,Discord)
  } else if(command === 'blacklist'){
    let user
    console.log('blacklist command sent')
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      return message.reply('You must have the permission `MANAGE_MESSAGES`.')
    }
   blacklist(message,args)
  }
  else if (command === "slowmode") {
    client.Commands.get("slowmode").execute(message, args, Discord);
  } else if (command === "ban") {
    client.Commands.get("ban").execute(message, args, Discord);
  } else if (command === "unban") {
    client.Commands.get("unban").execute(message, args, Discord, client);
  } else if (command === "dm") {
    client.Commands.get("dm").execute(message, args,Discord,client);
  } else if (command === "mute") {
    console.log(`mute command sent.`)
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You must have the permission `KICK_MEMBERS`.')
        const mentionmember = message.mentions.members.first();
        if(!args[0]) return message.channel.send('Format is: w!mute @USER TIMEM {s = seconds, m = minutes, h = hours {reason} }')

    
            if(!mentionmember)return message.reply('You need to mention a member to mute!') ;
            console.log(mentionmember.displayName)  
            
            if(!mentionmember.kickable) return message.reply('This user cannot be muted!');
            const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
            if(!muterole) return message.reply("I couldn't find the mute role!");
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New Mute!")
            .addFields(
                { name: 'Offender', value: `<@${mentionmember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
                { name: 'Reason: ', value: `${args[2]}`},   
                { name: 'Time: ', value: `${args[1]}`}  
            )
            .setTimestamp()
            .setColor('ff0000');
            if(!args[1]) return message.reply('Please have a reason!')
             var i
    var e = ""
   for (i = 0; i < args.length; i++) {
  if(i >= "2"){
    e = e + " " + args[i]
  }
}
args[2] = e
console.log(args[2])
            const time = args[1]
            if(!time) return message.reply('Please specify a time!');
            if(mentionmember.roles.cache.some(role => role.name === 'Muted')) return message.reply("This user is already muted!");
            mentionmember.roles.add(muterole,`Muted by ${message.member.displayName} with the reason ${args[2]} for ${args[1]}`).then(() =>{})
             setData(`Guild-${message.channel.guild.id}-IsMuted-${mentionmember.id}`,"True")
            console.log(`Muted ${mentionmember.displayName}  for ${ms(ms(time))} by ${message.member.displayName} Reason: ${args[2]}`)
            message.channel.send(`Sucessfully muted <@${mentionmember.id}> for ${ms(ms(time))}. Reason: ${args[2]}`)
            mentionmember.send(`You have been muted in ${message.guild.name} for ${ms(ms(time))}. Reason: ${args[2]}`)
            const channel = message.guild.channels.cache.find(channel => channel.name === "staff-logs")
            if(channel){
            channel.send(exampleEmbed)
            }
            
               var id = mentionmember.id
    
            setTimeout(async function(){
              
              if(message.guild.members.cache.find(m => m.id === id)){
                console.log('Trueeeee')
                
                mentionmember.roles.remove(muterole,"Auto Unmute");
                
              
            }
                  removeData(`Guild-${message.channel.guild.id}-IsMuted-${id}`)
                  
                if(channel){channel.send(`Auto Unmuted <@${mentionmember.id}>`)};
                console.log(`Auto Unmuted ${mentionmember.displayName}`)
            }, ms(time));
  
  } else if (command === "unmute") {
    console.log("unmute command sent");
    const mentionMember = message.mentions.members.first();
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.reply("You must have the permission `KICK_MEMBERS`.");
    if (!args[0]) return message.channel.send("Format is: w!unmute @USER ");
    if (!mentionMember)
      return message.reply("You need to mention a member to Unmute!");
    const muterole = message.guild.roles.cache.find(
      role => role.name === "Muted"
    );
    if (!muterole) return message.reply("I couldn't find the mute role!");
    if (!mentionMember.roles.cache.some(role => role.name === "Muted"))
      return message.reply("This user isn't muted!");
       const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New Unmute!")
            .addFields(
                { name: 'Offender', value: `<@${mentionMember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
            )
            .setTimestamp();
             const channel = message.guild.channels.cache.find(channel => channel.name === "staff-logs")
    mentionMember.roles
      .remove(muterole,"Unmute by " + message.member.displayName)
     removeData(`Guild-${message.channel.guild.id}-IsMuted-${mentionMember.id}`)
        console.log(
          `Unmuted ${mentionMember.displayName} by ${message.member.displayName}`
        )
  
    message.channel.send(`Sucessfully unmuted ${mentionMember}`);
    if(channel){
      return channel.send(exampleEmbed)
    }
    }
});
keepAlive();
client.login(process.env.TOKEN)
