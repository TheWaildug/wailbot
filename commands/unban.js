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

    

   

    

  

    //If all steps are completed successfully try kick this user
    message.guild.members.unban(args[0])
        .then(() => console.log(`UnBanned ${args[0]} by ${message.author}`))
        message.channel.send(`Sucessfully UnBanned ${args[0]}`)
        .catch(console.error);    
    }
}