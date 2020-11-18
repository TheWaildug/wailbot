function randomIntFromIntervalmax() { // min and max included 
  return Math.floor(Math.random() * (2 - 1 + 1) + 1);
}
module.exports = {
    name: 'ping',
    description: 'This is a ping command',
    execute(message, args,facts,quote,Discord){
       var which =  randomIntFromIntervalmax()
      console.log(which)
    if(which === 1){
      var randomfact =  facts[Math.floor(Math.random() * facts.length)];

        console.log('Ping Command Sent Type 1')
        var ping = Date.now() - message.createdTimestamp + " ms";
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Pong!')
        .setDescription(ping)
        .addFields(
            { name: 'Fun Fact', value: `${randomfact}` },
        )
        .setFooter('If you have a fact for the bot, do w!suggest and follow the prompts.')
        .setTimestamp();
       
    message.reply(exampleEmbed);   
    }  else if(which === 2){
      var randomquote =  quote[Math.floor(Math.random() * quote.length)];

        console.log('Ping Command Sent Type 2')
        var ping = Date.now() - message.createdTimestamp + " ms";
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Pong!')
        .setDescription(ping)
        .addFields(
            { name: 'Fun Quote', value: `${randomquote}` },
        )
        .setFooter('If you have a quote for the bot, do w!suggest and follow the prompts.')
        .setTimestamp();
       
    message.reply(exampleEmbed);   
    }
    }
}