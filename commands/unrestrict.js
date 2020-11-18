 async function getmember(guild,id){
        let member = await guild.members.fetch(id);
        return member
  }

module.exports ={
    name: 'unrestrict',
    description: 'unrestricts people',
    async execute(message,args,Discord){
      return;
        console.log('unrestrict command sent')

     
        
        //Then check if user have permissions to do that
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply('You must have the permission `KICK_MEMBERS`.');
            return;
        };
    
        //const a member, wich you need yo kick (its fist mention message member)
          var mentionMember
      if(message.mentions.members.first()){
      mentionMember = message.mentions.members.first()
    }else if(!message.mentions.members.first()){
      console.log(args[0])
      mentionMember = await getmember(message.channel.guild,args[0])

    }
    console.log(mentionMember)
    if(!mentionMember){
      return message.reply('Please specify a user or their id.')
    }
    
    
        //Check if your bot can`t kick this user, so that show this error msg 
        if(!mentionMember.kickable) {
            message.reply('I have no permissions to unrestrict this user.');
            return;
        };
    
        
      
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New UnRestrict!")
            .addFields(
                { name: 'Offender', value: `${mentionMember.displayName}` },
                { name: "Sender:", value: `${message.member.displayName}` },
  
            )
            .setTimestamp();
            const restrictrole = message.guild.roles.cache.find(role => role.name === "Restricted");
            if(!restrictrole) return message.reply("I couldn't find the restricted role!");
        const channel = message.guild.channels.cache.find(channel => channel.name === "staff-logs")
        if(!mentionMember.roles.cache.find(r => r.name === "Restricted")){
          return message.reply('This user is not restricted')
        }
        //If all steps are completed successfully try kick this user
            mentionMember.roles.remove(restrictrole,"UnRestrict")
            .then(() => console.log(`UnRestricted ${mentionMember.displayName} by ${message.member.displayName}.`))
        
            message.channel.send(`Sucessfully UnRestricted ${mentionMember.displayName}.`)
            channel.send(exampleEmbed)
            .catch(console.error);     
    }
} 