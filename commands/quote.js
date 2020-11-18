module.exports = {
    name: 'quote',
    description: 'This is a quote command',
    execute(message,quotes,Discord){
console.log('haha somthing')
      var randomquote =  quotes[Math.floor(Math.random() * quotes.length)];
console.log(randomquote)
        console.log('quote Command Sent.')
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Quote')
        .addFields(
            { name: randomquote, value: `Do w!fact to see a fact!`},
        )
        .setTimestamp()
        .setFooter('If you have a quote for the bot, do w!suggest and follow the prompts.');
        message.reply(exampleEmbed)    
    }
}