        module.exports = {
    name: 'unban',
    description: 'This command unbans the player;',
    execute(message, args,Discord,Client){
      console.log('unban command sent')
   //Then check if user have permissions to do that
   if(!message.member.hasPermission('BAN_MEMBERS')) {
    message.reply('You must have the permission `BAN_MEMBERS`.');
    return;
};

     if(!args[0]) return message.channel.send('Format is: w!unban | UserID')

 
    

   
    const member = Client.users.fetch(args[0])
    if(!member) return message.reply("Please specify a member's user id to unban!")
    console.log(member)
    let ban =  message.guild.fetchBans();
    var user = ban.get(member.id);
    message.guild.members.unban(member);
    const exampleEmbed = new Discord.MessageEmbed()
    .then(() => console.log(`UnBanned ${User.tag} by ${message.member.tag}`))
    message.channel.send(`Sucessfully UnBanned ${User.tag}`)

      
    .setColor('#FF0000')
    .setTitle('Moderation')
    .setDescription("New Unban!")
    .addFields(
        { name: 'Offender', value: (`<@${User.id}>`) },
        { name: "Sender:", value: `<@${U}>` },
    )
    .setTimestamp();

    const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
    if(!channel) return;
    channel.send(exampleEmbed)
    //If all steps are completed successfully try kick this user
    
    .catch(console.error);  
    }
}