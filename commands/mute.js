module.exports = {
    name: "mute",
    description: "mutes the people",
    execute(message,args,Discord,ms){
        console.log(`mute command sent.`)
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You must have the permission `KICK_MEMBERS`.')
        const mentionmember = message.mentions.members.first();
        if(!args[0]) return message.channel.send('Format is: w!mute | @USER | {reason} | 1m {s = seconds, m = minutes, h = hours}')
       
    
            if(!mentionmember)return message.reply('You need to mention a member to mute!') ;
            console.log(mentionmember.displayName)  
            
            if(!mentionmember.kickable) return message.reply('This user cannot be muted!')
            const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
            if(!muterole) return message.reply("I couldn't find the mute role!");
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New Mute!")
            .addFields(
                { name: 'Offender', value: `${mentionMember.displayName}` },
                { name: "Sender:", value: `${message.member.displayName}` },
                { name: 'Reason: ', value: `${args[1]}`},   
            )
            .setTimestamp();
            if(!args[1]) return message.reply('Please have a reason!')
            const time = args[2]
            if(!time) return message.reply('Please specify a time!');
            if(mentionmember.roles.cache.some(role => role.name === 'Muted')) return message.reply("This user is already muted!")
            mentionmember.roles.add(muterole)
            .then(() =>  console.log(`Muted ${mentionmember.displayName}  for ${ms(ms(time))} by ${message.member.displayName} Reason: ${args[1]}`)) 
            message.channel.send(`Sucessfully muted ${mentionmember.displayName} for ${ms(ms(time))}. Reason: ${args[1]}`)
            mentionmember.send(`You have been muted in ${message.guild.name} for ${ms(ms(time))}. Reason: ${args[1]}`)
            const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
            channel.send(exampleEmbed)
    
            
               
    
            setTimeout(function(){
                if(!mentionmember.roles.cache.some(role => role.name === 'Muted')) return;
                mentionmember.roles.remove(muterole);
                if(channel){channel.send(`Auto Unmuted ${mentionmember.displayName}`)};
                console.log(`Auto Unmuted ${mentionmember.displayName}`)
                
            }, ms(time));
    }
}