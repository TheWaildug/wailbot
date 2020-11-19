  module.exports = {
    name: 'nickname',
    description: 'changes nickname of a player.',
    execute(message,args,Discord,client){
      console.log('nickname command sent')
      
      //Then check if user have permissions to do that
    if(!message.member.hasPermission('MANAGE_NICKNAMES')) {
        message.reply('You must have the permission `MANAGE_NICKNAMES`.');
        return;
    };
 if(!args[0]) return message.channel.send('Format is: w!nickname | @USER | {nickname} | {reason}')
   
    const mentionMember = message.mentions.members.first();
    //If user dont mention a member, that show him this error msg
    if(!mentionMember) {
        message.reply('You need to mention a member to change!');
        return;
    }
  var i
    var e = ""
    var reason = ""
    var contrea = false  
   for (i = 0; i < args.length; i++) {
     console.log(args[i])
     if(contrea == true){
    reason = reason + " " + args[i]
  }
  if(args[i].toLowerCase() == "reason:"){
    contrea = true
  }
  if(i >= "1" && contrea == false){
    e = e + args[i] + " "
  }
  
}
args[1] = e
  args[2] = reason
console.log(reason)
console.log(args[1])
if(!args[2]){
  args[2] = "Nickname Change by " + message.member.displayName + "."
}
    if(!args[1]){
        message.reply('Please have a nickname!');
        return;
    };
if(!args[2]){
  args[2] = "Nickname Change by " + message.member.displayName
}
    //Check if your bot can`t kick this user, so that show this error msg 
   var cont = true
var oldnick = mentionMember.displayName

 mentionMember.setNickname(args[1],args[2]).catch((error) => {
  console.warn("Error " + error);
  cont = false
  return message.reply("Something went wrong! `" + error + "`")
})
.then(() => {
  if(cont === true){
message.reply(" Sucessfully changed <@" + mentionMember + "> 's name from `" + oldnick +'` to `' + args[1] +  ' ` with the reason: `' +  args[2] + '`')
mentionMember.send(` Your nickname in ${  message.channel.guild}` + " has been changed from `" + oldnick +'` to `' + args[1] +  ' ` with the reason: `'+  args[2] + '`')
const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Utility')
            .setDescription("New Nickname Change!")
            .addFields(
                { name: 'User', value: `<@${mentionMember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
                { name: 'Old Nick: ', value: `${oldnick}`}, 
                {name: "New Nick: ", value: `${args[1]}`}  
            )
            .setTimestamp();
      
     
     
            const channel = message.guild.channels.cache.find(channel => channel.name === 'staff-logs')
            if(channel){
            channel.send(exampleEmbed)
        }
  }
})
    }
}