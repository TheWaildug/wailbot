function randomIntFromIntervalmax(max) { // min and max included 
  return Math.floor(Math.random() * (max - 1 + 1) + 1);
}
module.exports = {
    name: 'random',
    description: 'This is a random command',
    execute(message,args,Discord){
    console.log('random')
    if(!args[0]) return message.channel.send('Format is: w!random | MAXIMUM')
   
      var randomnumber =  randomIntFromIntervalmax(args[0])
  
      console.log(randomnumber)
      console.log(randomnumber)
        console.log('random number Command Sent.')
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Random Number')
        .addFields(
            { name: randomnumber, value: `Please don't break my bot. If you do, DM me. Thanks!` },
        )
        .setTimestamp()
        .setFooter('If you have any ideas for a command, please DM me.');
        message.reply(exampleEmbed)    
    }
}