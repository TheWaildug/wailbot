       async function getmember(Client,id){
        let member = await Client.users.fetch(id);
        return member
    
       }
       
        module.exports = {
    name: 'unban',
    description: 'This command unbans the player;',
    execute(message, args,Discord,Client){
      console.log('unban command sent')
   //Then check if user have permissions to do that
   if(!message.member.hasPermission('BAN_MEMBERS')) {
    message.reply('You must have the permission `BAN_MEMBERS`.');
    return;};

     if(!args[0]) return message.channel.send('Format is: w!unban | UserID')

 
 
    getmember(Client,args[0]).then(member =>{
    if(!member) return message.reply("Please specify a member's user id to unban!")
    console.log(member)
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Moderation')
    .setDescription("New Unban!")
    .addFields(
        { name: 'Offender', value: (`<@${member.id}>`) },
        { name: "Sender:", value: `<@${message.member.id}>` },
    )
    .setTimestamp();

    const channel = message.guild.channels.cache.find(channel => channel.name === "staff-logs")
    if(!channel) return;
    channel.send(exampleEmbed)
  if(member){
    message.guild.members.unban(member,`UnBan by ${message.member.displayName}`);
   console.log(`UnBanned ${member.id} by ${message.member.displayName}`)
    message.channel.send(`Sucessfully UnBanned <@${member.id}>`)
 
  }
   })
  }
}  