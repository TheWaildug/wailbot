let banmsg = ('None.')
module.exports = {
    name = 'banmessage',
    description = 'changes ban message',
    execute(message,Discord){
        console.log(`changing ban msg`)
        message.reply("See or Change?")
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        console.log(collector)
        collector.on('collect',msg => {
            if(msg.content === "See"){
                msg.reply(`Your current ban message is: ${banmsg}`) 
            }
            else if(msg.content === "Change"){
               msg.reply('got it.')
            }
        })
    } 
}