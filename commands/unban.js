        module.exports = {
    name: 'unban',
    description: 'This command unbans the player;',
    execute(message, args,Discord,Client){
      console.log('unban command sent')

     if(!args[0]) return message.reply('You need to mention a user to unban!')

    //Then check if user have permissions to do that
    if(!message.member.hasPermission('BAN_MEMBERS')) {
        message.reply('You must have the permission "Ban Members".');
        return;
    };

    

   
    const User = Client.users.fetch(args[0]);
    console.log(User); // Some user object.
    console.log(User.tag);
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Moderation')
    .setDescription("New Unban!")
    .addFields(
        { name: 'Offender', value: (`${User.tag}`) },
        { name: "Sender:", value: `${message.member.displayName}` },
    )
    .setTimestamp();

    const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
  
const banList = message.guild.fetchBans();

        if(!banList.find(user => user.id === args[0])) return message.reply("User is not banned!")
    //If all steps are completed successfully try kick this user
    message.guild.members.unban(args[0])
        .then(() => console.log(`UnBanned ${User.tag} by ${message.member.displayName}`))
        message.channel.send(`Sucessfully UnBanned ${User.tag}`)
        channel.send(exampleEmbed)
        .catch(console.error);    
    }
}