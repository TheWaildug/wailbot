module.exports ={
    name: 'unrestrict',
    description: 'unrestricts people',
    execute(message,args,Discord){
        console.log('unrestrict command sent')

     


        //Then check if user have permissions to do that
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply('You have no permissions to do that.');
            return;
        };
    
        //const a member, wich you need yo kick (its fist mention message member)
        let mentionMember = message.mentions.members.first();
        //If user dont mention a member, that show him this error msg
        if(!mentionMember) {
            message.reply('You need to mention a member to unrestrict!');
            return;
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
        const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
        //If all steps are completed successfully try kick this user
            mentionMember.roles.remove(restrictrole)
            .then(() => console.log(`UjRestricted ${mentionMember.displayName} by ${message.member.displayName}.`))
        
            message.channel.send(`Sucessfully UnRestricted ${mentionMember.displayName}.`)
            channel.send(exampleEmbed)
            .catch(console.error);     
    }
} 