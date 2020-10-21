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
        const channel = message.mentions.channels.first()   
        if(channel.type === 'text'){
            channel.setRateLimitPerUser(args[1])
        }
    }
}