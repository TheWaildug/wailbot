module.exports = {
    name: 'welcome',
    description: 'Fires when player joins server.',
    execute(member, Discord ){
      console.log(`${member.displayName} has joined the server thing.`)
      const channel = member.guild.channels.cache.find(channel => channel.name === "hi-bye")
      if(channel){
      channel.send(`Welcome to ${member.guild.name}, ${member}! Please read the rules.`)
      }
      member.send(`Have a nice time here in ${member.guild.name}!`)
      .catch(() => console.log(`I cannot send a DM to ${member.displayName}.`));   
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Member Logs')
        .setDescription("New Player!")
        .addFields(
            { name: 'Player', value: `${member.displayName}` },
        )
        .setTimestamp();
       const memberlogs = member.guild.channels.cache.find(channel => channel.name === 'member-logs')
       if(memberlogs){
       memberlogs.send(exampleEmbed)
       }
    } 
}