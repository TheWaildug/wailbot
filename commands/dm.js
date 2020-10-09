module.exports = {
    name: 'dm',
    description: 'dms a player.',
    execute(message,args ){
      console.log('dm command sent')
      //Then check if user have permissions to do that
    if(!message.member.hasPermission('MANAGE_SERVER')) {
        message.reply('You have no permissions to do that.');
        return;
    };

    //const a member, wich you need yo kick (its fist mention message member)
    let mentionMember = message.mentions.members.first();
    //If user dont mention a member, that show him this error msg
    if(!mentionMember) {
        message.reply('You need to mention a member to dm!');
        return;
    }

    if(!args[1]){
        message.reply('Please have a message!');
        return;
    };

    //Check if your bot can`t kick this user, so that show this error msg 
    mentionMember.send(args[1])
        .catch(() => message.reply(`I cannot send a DM to ${mentionMember}.`));   


        console.log(`DMed ${mentionMember.displayName} by ${message.member.displayName}. Message: ${args[1]}`)
        
        message.channel.send(`Sucessfully DMed ${mentionMember.displayName}. Message: ${args[1]}`)
        .catch(console.error);    
    } 
}