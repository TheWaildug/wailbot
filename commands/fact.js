module.exports = {
    name: 'fact',
    description: 'This is a fact command',
    execute(message,facts,Discord){
      var randomfact =  facts[Math.floor(Math.random() * facts.length)];

        console.log('fact Command Sent.')
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Fun Fact')
        .addFields(
            { name: randomfact, value: `Do w!quote to see a quote!` },
        )
        .setTimestamp()
        .setFooter('If you have a fact for the bot, do w!suggest and follow the prompts.');
        message.reply(exampleEmbed)    
    }
}