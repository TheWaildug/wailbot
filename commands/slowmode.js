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
    if(!args[1]) return;
        const mentionchannel = message.mentions.channels.first()   
        const channel = message.guild.channels.cache.get(mentionchannel)
        console.log(channel.name)        
        if(channel.type === 'text'){
            channel.setRateLimitPerUser(args[1])
        }
    }
}