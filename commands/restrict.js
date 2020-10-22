module.exports ={
    name: 'restrict',
    description: 'restricts people',
    execute(message,args,Discord){
        return message.channel.send("Whoops! It seems restrict commmand isn't in use currently!")
        console.log('restrict command sent')

     


        //Then check if user have permissions to do that
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply('You must have the permission `KICK_MEMBERS`.');
            return;
        };
    
        //const a member, wich you need yo kick (its fist mention message member)
        let mentionMember = message.mentions.members.first();
        //If user dont mention a member, that show him this error msg
        if(!mentionMember) {
            message.reply('You need to mention a member to restrict!');
            return;
        }
    
        if(!args[1]){
            message.reply('Please have a reason!');
            return;
        };
    
        //Check if your bot can`t kick this user, so that show this error msg 
        if(!mentionMember.kickable) {
            message.reply('I have no permissions to restrict this user.');
            return;
        };
    
        
      
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New Restrict!")
            .addFields(
                { name: 'Offender', value: `${mentionMember.displayName}` },
                { name: "Sender:", value: `${message.member.displayName}` },
                { name: 'Reason: ', value: `${args[1]}`},   
            )
            .setTimestamp();
            const restrictrole = message.guild.roles.cache.find(role => role.name === "Restricted");
            if(!restrictrole) return message.reply("I couldn't find the restricted role!");
        const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
        //If all steps are completed successfully try kick this user
            mentionMember.roles.add(restrictrole)
            .then(() => console.log(`Restricted ${mentionMember.displayName} by ${message.member.displayName} for ${args[1]}.`))
            mentionMember.send(`You have been Restricted in ${message.channel.guild}. Reason: ${args[1]}.  To become unrestricted, please DM <@575252669443211264> and appeal.`)
            .catch(() => message.reply(`I cannot send a DM to ${mentionMember}.`));           
            message.channel.send(`Sucessfully Restricted ${mentionMember.displayName} for ${args[1]}.`)
            channel.send(exampleEmbed)
            .catch(console.error);     
    }
} 