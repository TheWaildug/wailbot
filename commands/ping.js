module.exports = {
    name: 'ping',
    description: 'This is a ping command',
    execute(message, args){
        console.log('Ping Command Sent.')
        var ping = Date.now() - message.createdTimestamp + " ms";
    message.reply("Pong! `" + `${Date.now() - message.createdTimestamp}` + " ms`");    
    }
}