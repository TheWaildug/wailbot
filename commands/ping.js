module.exports = {
    name: 'ping',
    description: 'This is a ping command',
    execute(message, args){
        console.log('Ping Command Sent.')
        message.channel.send('Pong!');       
    }
}