module.exports = {
    name: 'goodbye',
    description: 'Fires when player leaves server.',
    execute(member, Discord ){
      console.log(`${member.displayName} has left the server thing.`)
      const channel = member.guild.channels.cache.find(channel => channel.name === "hi-bye")
      channel.send(`It's sad to see you go, ${member}.`)
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Member Logs')
        .setDescription("Player Left")
        .addFields(
            { name: 'Player', value: `${member.displayName}` },
        )
        .setTimestamp();
       const memberlogs = member.guild.channels.cache.find(channel => channel.name === 'member-logs')
       memberlogs.send(exampleEmbed)
    } 
}