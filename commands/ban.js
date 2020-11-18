async function getmember(guild,id){
        let member = await guild.members.fetch(id);
        return member
  }

module.exports = {
  name: "ban",
  description: "bans people",
  async execute(message, args, Discord, client) {
    console.log("ban command send");

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.channel.send("You must have the permission `BAN_MEMBERS`.");
      return;
    }

    if (!args[0])
      return message.channel.send("Format is: w!ban | @USER | {reason}");

    //const a member, wich you need yo kick (its fist mention message member)
   var mentionMember,memberto
    var cont = true
      if(message.mentions.members.first()){
      mentionMember = memberto = message.mentions.members.first()
    }else if(!message.mentions.members.first()){
      console.log(args[0])
      mentionMember = memberto = await getmember(message.channel.guild,args[0]).catch.catch(error => {
        console.warn("Error " + error);
        cont = false
        return message.reply("Something went wrong! `" + error + "`");
      })

    }
    console.log(mentionMember.displayName)
    if(!mentionMember){
      return message.reply('Please specify a user or their id.')
    }
    if(cont != true){
      return
    }
    if(!mentionMember.bannable){
      return message.reply("I do not have the right perms to ban this user."
      )
    }
     if(mentionMember.id === message.member.id){
      return message.reply("Dude you can't ban yourself!")
    }
     if(mentionMember.roles.highest.position >= message.member.roles.highest.position){
       console.log('higher')
      return message.reply("This user has an equal or higher role.")
    }
    //Check if your bot can`t kick this user, so that show this error msg
   
   
    if (!args[1]) {
      message.reply("Please have a reason!");
      return;
    }
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Moderation")
      .setDescription("New Ban!")
      .addFields(
        { name: "Offender", value: `<@${mentionMember.id}>` },
        { name: "Sender:", value: `<@${message.member.id}>` },
        { name: "Reason: ", value: `${args[1]}` }
      )
      .setTimestamp();

    const channel = message.guild.channels.cache.find(
      channel => channel.name === "staff-logs"
    );
    //If all steps are comconst channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
    memberto
      .ban({ reason: `Ban by ${message.member.displayName} for the reason: ` + args[1] }).catch(error => {
      console.warn("Error " + error);
      cont = false;
      return message.reply("Something went wrong! `" + error + "`");
    }).then(() =>{
      if(cont != true){
        return;
      }
        console.log(
          `Banned ${mentionMember.displayName}  for ${args[1]} by ${message.member.displayName}` 
        )
        mentionMember.send(
        `You have been banned from ${message.channel.guild}. Reason: ${args[1]}.`
      ).catch(() => console.log(`I cannot send a DM to ${member.displayName}.`));   
    
    

    message.channel.send(
      `Sucessfully Banned ${mentionMember.displayName} for ${args[1]}`
    )
    }); 
  }
};
