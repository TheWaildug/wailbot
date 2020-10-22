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

     if(!args[0]) return message.channel.send('Format is: w!unban | @USER')

 
    

   
    const User = message.mentions.members.first();
    if(!User) return message.reply('Please specify a member to unban!')
    console.log(User.tag);
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Moderation')
    .setDescription("New Unban!")
    .addFields(
        { name: 'Offender', value: (`<@${User.id}>`) },
        { name: "Sender:", value: `<@${message.member.id}>` },
    )
    .setTimestamp();

    const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
    
  
    //If all steps are completed successfully try kick this user
    message.guild.members.unban(user)
        .then(() => console.log(`UnBanned ${User.displayName} by ${message.member.displayName}`))
        message.channel.send(`Sucessfully UnBanned ${User.displayName}`)
        channel.send(exampleEmbed)
        .catch(console.error);    
    }
}