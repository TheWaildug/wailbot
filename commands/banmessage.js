module.exports = banmsg = ('None.')
module.exports = {
    name: 'banmessage',
    description: 'changes ban message',
    execute(message,Discord){
         //Then check if user have permissions to do that
    if(!message.member.hasPermission('BAN_MEMBERS')) {
        message.reply('You have no permissions to do that');
        return;
    };
        console.log(`changing ban msg`)
        message.reply("See or Change?")
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect',msg => {
            if(msg.content === "See"){
                msg.reply(`Your current ban message is: ${banmsg}`) 
            }
            else if(msg.content === "Change"){
               msg.reply('Please reply with the new ban message.')
               const collector2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
               collector2.on('collect',newmsg =>{
                   print('teqrewewtw')
                    if(!newmsg.content === "Reset"){
    
                        newmsg.reply(`You entered ${newmsg.content} is this correct?`)
                        const collector3 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
                        collector3.on('collect',evennewer =>{
                            if(evennewer.content === "Yes"){
                                banmsg = evennewer.content
                                print(banmsg)
                            }
                            else if(evennewer.content === "No"){
                                evennewer.reply('Please use the command again.')
                            }
                        })
                    }
                    
                    else if(newmsg.content === "Reset"){
                        newmsg.reply("Ban message reset.")
                            banmsg = "None"
                        }
               })
            }
        })
    } 
}