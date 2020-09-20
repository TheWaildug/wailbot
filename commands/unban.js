        module.exports = {
    name: 'unban',
    description: 'This command unbans the player;',
    execute(message, args){
      console.log('unban command sent')

     

    //Then check if user have permissions to do that
    if(!message.member.hasPermission('BAN_MEMBERS')) {
        message.channel.send('You must have the permission "Ban Members".');
        return;
    };

    //const a member, wich you need yo kick (its fist mention message member)
    let mentionMember = message.mentions.members.first();

   

    

    
    if(!args[1]){
        message.channel.send('Please have a reason!');
        return;
    };

    //If all steps are completed successfully try kick this user
    message.guild.members.unban(mentionMember)
        .then(() => console.log(`UnBanned ${mentionMember.displayName} for ${args[1]} by ${message.author}`))
        mentionMember.send(`You have been unbanned from ${message.channel.guild}. Reason: ${args[1]}`)
        message.channel.send(`Sucessfully UnBanned ${mentionMember.displayName} for ${args[1]}`)
        .catch(console.error);    
    }
}