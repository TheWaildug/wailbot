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
    if(!args[1]) return message.channel.send('Format is: w!slowmode | #channel | {time in seconds}')
        const mentionchannel = message.mentions.channels.first()   
        const channel = message.guild.channels.cache.get(mentionchannel.id)
        console.log(channel.name)
        console.log(args[1])
        if(channel.type === 'text'){
            channel.setRateLimitPerUser(args[1])
            return message.channel.send('Sucessfully changed slowmode in {@' + mentionchannel.id + `} to ${args(1)}.`)
        }
    }
}