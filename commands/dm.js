module.exports = {
    name: 'dm',
    description: 'dms a player.',
    execute(message,args ){
      console.log('dm command sent')
     
      //Then check if user have permissions to do that
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.reply('You must have the permission `MANAGE_MESSAGES`.');
        return;
    };
 if(!args[0]) return message.channel.send('Format is: w!dm | @USER | {message}')
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
    if(mentionMember.send(args[1])){



        console.log(`DMed ${mentionMember.displayName} by ${message.member.displayName}. Message: ${args[1]}`)
        
        message.channel.send(`Sucessfully DMed ${mentionMember.displayName}. Message: ${args[1]}`)
        .catch(console.error);   
        return;
     }
     else if(!mentionMember.send(args(1))){
        return message.reply('I cannot DM this user!')
     }
    }
}