  module.exports = {
    name: 'dm',
    description: 'dms a player.',
   
    execute(message,args,Discord,client){
      console.log('dm command sent')
      var cont = true
      //Then check if user have permissions to do that
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.reply('You must have the permission `MANAGE_MESSAGES`.');
        return;
    };
 if(!args[0]) return message.channel.send('Format is: w!dm | USER_ID | {message}')
    //const a member, wich you need yo kick (its fist mention message member)
     async function getmember(Client,id){
        let member = await Client.users.fetch(id);
        return member
  }

    getmember(client,args[0]).then(mentionMember =>{
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

    const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Utility')
            .setDescription("New DM!")
            .addFields(
                { name: 'User', value: `<@${mentionMember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
                { name: 'Message: ', value: `${args[1]}`},   
            )
            .setTimestamp();
      
     
     
            const channel = message.guild.channels.cache.find(channel => channel.name === "user-dm-logs")
           
          if(message.attachments.size > 0){
        console.log('attach')

      message.attachments.forEach(att => {
        console.log(att.url)
        mentionMember.send({files: [att.url]}).catch((error) => {
  console.warn("Error " + error);
  cont = false
  return message.reply("Something went wrong! `" + error + "`")
}).then(() => {
  if(cont === true){
     if(channel){
          
          if(message.attachments.size > 0){
        console.log('attach')
       
             message.attachments.forEach(att => {
        console.log(att.url)
        channel.send(`DM to <@${mentionMember.id}>`,{files: [att.url]}); 
      })
    
            }
        }
    console.log(`DMed ${mentionMember.displayName}  by ${message.member.displayName}. Message: ${att.url}`)
        
         message.channel.send(`Sucessfully DMed <@${mentionMember.id}>. Message: ${att.url}`)
 
        return;
  }
})
      })
          }
      if(message.content){
        console.log('content')
    mentionMember.send(args[1]).catch((error) => {
  console.warn("Error " + error);
  cont = false
  return message.reply("Something went wrong! `" + error + "`") 
}).then( () => {
  if(cont === true){
  channel.send(exampleEmbed)


        console.log(`DMed ${mentionMember.id}  by ${message.member.displayName}. Message: ${args[1]}`)
        
        message.channel.send(`Sucessfully DMed <@${mentionMember.id}>. Message: ${args[1]}`)
 
        return;
  }
     })}
    })
    }
    
}