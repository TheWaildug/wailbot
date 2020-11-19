module.exports = {
  name: "slowmode",
  description: "changes slowmode",
  execute(message, args, Discord) {
    var yes = false
    console.log("slowmode command sent");
    //Then check if user have permissions to do that

    if (!args[0])
      return message.channel.send(
        "Format is: w!slowmode #channel {time in seconds}"
      );
    var channel,mentionchannel

    var cont = true;
    if (message.mentions.channels.first()) {
      channel = mentionchannel = message.mentions.channels.first();
    } else {
      channel = mentionchannel = message.channel.guild.channels.cache.find(
        r => r.id === args[0]
      );
    }
    if (!channel && mentionchannel) {
      message.reply("please # a channel or enter its ID .");
      cont = false;
    }
    if (cont == false) {
      return;
    }
    console.log(channel.name);
    const perms = message.member.permissionsIn(channel).toArray()
 
    perms.forEach(function(item, index, array) {
 
  if(item === "MANAGE_MESSAGES"){
    yes = true
     if (!args[1])
      return message.channel.send(
        "Current Slowmode in " +
          `<#${mentionchannel.id}>` +
          " is " +
          channel.rateLimitPerUser +  
          " seconds."
      );

    console.log(args[1]);
    if(args[1] > 21600){
      return message.reply('You can only go up to 21600 seconds.')
    }
    if (channel.type === "text") {
      console.log('e')
      channel.setRateLimitPerUser(args[1],`Slowmode chaned by ${message.member.displayName}`).catch(error => {
            console.warn("Error " + error);
            cont = false;
            return message.reply("Something went wrong! `" + error + "`");
          })
          if(cont != true){
            return;
          }
       const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Utility')
            .setDescription("New Slowmode Change!")
            .addFields(
                { name: 'Sender:', value: `<@${message.member.id}>` },
                { name: "Channel:", value: `<#${mentionchannel.id}>` },
                { name: 'Slowmode: ', value: `${args[1]}`},   
            )
            .setTimestamp();
            const chan = message.guild.channels.cache.find(channel => channel.name === "staff-logs")
            chan.send(exampleEmbed)
            message.channel.send(
        "Sucessfully changed slowmode in <#" +
          mentionchannel.id +
          `> to ${args[1]} seconds.`
          
      );     
    }
    
  }
  
}) 
if(!yes){
console.log('eeee')
 return message.reply("You do not have permission to change the slowmode in this channel!")
  }}
};
