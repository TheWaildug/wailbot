 async function getmember(guild,id){
        let member = await guild.members.fetch(id);
        return member
  }

module.exports = {
    name: 'kick',
    description: 'This command kicks the player;',
    async execute(message, args, Discord,client){
      console.log('kick command sent')

    


    //Then check if user have permissions to do that
    if(!message.member.hasPermission('KICK_MEMBERS')) {
        message.reply('You must have the permission `KICK_MEMBERS`.');
        return;
    };
    if(!args[0]) return message.channel.send('Format is: w!kick | @USER | {reason}')
    //const a member, wich you need yo kick (its fist mention message member)
    var mentionMember
    var cont
      if(message.mentions.members.first()){
      mentionMember = message.mentions.members.first()
    }else if(!message.mentions.members.first()){
      console.log(args[0])
      mentionMember = await getmember(message.channel.guild,args[0]).catch(error => {
        console.warn("Error " + error);
        cont = false
        return message.reply("Something went wrong! `" + error + "`");
      })

    }
    console.log(mentionMember)
    if(!mentionMember){
      return message.reply('Please specify a user or their id.')
    }
    if(cont != true){
      return
    }
    if(!args[1]){
        message.reply('Please have a reason!');
        return;
    };

    //Check if your bot can`t kick this user, so that show this error msg 
    if(!mentionMember.kickable) {
        message.reply('I have no permissions to kick this user.');
        return;
    };

    
  
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Moderation')
        .setDescription("New Kick!")
        .addFields(
            { name: 'Offender', value: `<@${mentionMember.id}>` },
            { name: "Sender:", value: `<@${message.member.id}>` },
            { name: 'Reason: ', value: `${args[1]}`},   
        )
        .setTimestamp();
    const channel = message.guild.channels.cache.find(channel => channel.name === "staff-logs")
    //If all steps are completed successfully try kick this user
    mentionMember.kick(args[1])
        .then(() => console.log(`Kicked ${mentionMember.displayName} by ${message.member.displayName}`))
        mentionMember.send(`You have been kicked from ${message.channel.guild}. Reason: ${args[1]}`)
        .catch(() => console.log(`I cannot send a DM to ${mentionMember.displayName}.`));   
        message.channel.send(`Sucessfully Kicked ${mentionMember} for the reason ${args[1]}`)
        channel.send(exampleEmbed)
        .catch(console.error);    
    }
}