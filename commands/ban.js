
module.exports ={
    name: 'ban',
    description: 'bans people',
    execute(message,args,Discord,client){
        console.log('ban command send')
        
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send('You must have the permission `BAN_MEMBERS`.');
            return;
        };
    
        if(!args[0]) return message.channel.send('Format is: w!ban | @USER | {reason}')
        
    
        //const a member, wich you need yo kick (its fist mention message member)
        let mentionMember = message.mentions.members.first();
        //If user dont mention a member, that show him this error msg
        if(!mentionMember) {
            message.reply('You need to mention a member to ban!');
            return;
        }
        else if(mentionMember){
            memberto = message.guild.members.cache.get(mentionMember.id)
        }
    
       
    
        //Check if your bot can`t kick this user, so that show this error msg 
        if(!mentionMember.bannable) {
            message.reply('I have no permissions to ban this user.');
            return
        };
    
        
        if(!args[1]){
            message.reply('Please have a reason!');
            return;
        };
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Moderation')
        .setDescription("New Ban!")
        .addFields(
            { name: 'Offender', value: `<@${mentionMember.id}>` },
            { name: "Sender:", value: `<@${message.member.id}>` },
            { name: 'Reason: ', value: `${args[1]}`},
        )
        .setTimestamp();
    
        const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
        //If all steps are comconst channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
        memberto.ban({ days: 7, reason: args[1] })
            .then(() => console.log(`Banned ${mentionMember.displayName}  for ${args[1]} by ${message.member.displayName}`))
            mentionMember.send(`You have been banned from ${message.channel.guild}. Reason: ${args[1]}. Info: ${client.banmsg.get(message.guild.id)}.`)
            .catch(() => message.reply(`I cannot send a DM to ${mentionMember}.`));   
            channel.send(exampleEmbed)
            message.channel.send(`Sucessfully Banned ${mentionMember.displayName} for ${args[1]}`)   
    }

}