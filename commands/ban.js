        module.exports = {
    name: 'ban',
    description: 'This command bans the player;',
    execute(message, args){
      console.log('ban command sent')
        let memberto = ''
      
    if(!message.member.hasPermission('BAN_MEMBERS')) {
        message.channel.send('You must have the permission "Ban Members".');
        return;
    };


    

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


    //If all steps are completed successfully try kick this user
    memberto.ban(args[1])
        .then(() => console.log(`Banned ${mentionMember.displayName}  for ${args[1]} by ${message.author}`))
        mentionMember.send(`You have been banned from ${message.channel.guild}. Reason: ${args[1]}`)
        message.reply(`Sucessfully Banned ${mentionMember.displayName} for ${args[1]}`)
        .catch(console.error);    
    }
}