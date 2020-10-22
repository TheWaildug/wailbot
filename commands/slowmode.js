module.exports = {
    name: 'slowmode',
    description: 'changes slowmode',
    execute(message,args,Discord){
      console.log('slowmode command sent')
      //Then check if user have permissions to do that
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.reply('You must have the permission `MANAGE_MESSAGES`.');
        return;
    };
    if(!args[0]) return message.channel.send('Format is: w!slowmode | #channel | {time in seconds}')
   
        const mentionchannel = message.mentions.channels.first()   
        const channel = message.guild.channels.cache.get(mentionchannel.id)
        console.log(channel.name)
        if(!args[1]) return message.channel.send('Current Slowmode in ' + '<#${mentionchannel.id}>' + '` is ' + channel.RateLimitPerUser + '.')
        console.log(args[1])
        if(channel.type === 'text'){
            channel.setRateLimitPerUser(args[1])
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Utility')
            .setDescription("Slowmode Change")
            .addFields(
                { name: "Sender:", value: `<@${message.member.id}>` },
                { name: 'Channel: ', value: `<#${mentionchannel.id}>`},
                {name: "Slowmode:", value: `${args[1]}`},  
            )
            .setTimestamp();
            message.channel.send('Sucessfully changed slowmode in <#' + mentionchannel.id + `> to ${args[1]} seconds.`)
            const mod = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
            if(!mod) return;
            mod.send(exampleEmbed)
           
        }
    }
}