 async function getmember(guild,id){
        let member = await guild.members.fetch(id);
        return member
  }

module.exports ={
    name: 'restrict',
    description: 'restricts people',
    async execute(message,args,Discord){
       return;
        console.log('restrict command sent')

     


        //Then check if user have permissions to do that
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply('You must have the permission `KICK_MEMBERS`.');
            return;
        };
    var memberto
      if(message.mentions.members.first()){
      memberto = message.mentions.members.first()
    }else if(!message.mentions.members.first()){
      console.log(args[0])
      memberto = await getmember(message.channel.guild,args[0])

    }
    console.log(memberto)
    if(!memberto){
      return message.reply('Please specify a user or their id.')
    }
    
        if(!args[1]){
            message.reply('Please have a reason!');
            return;
        };
    console.log(memberto.kickable)
        //Check if your bot can`t kick this user, so that show this error msg 
        if(!memberto.kickable) {
            message.reply('I have no permissions to restrict this user.');
            return;
        };
    
        
      
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New Restrict!")
            .addFields(
                { name: 'Offender', value: `<@${memberto.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
                { name: 'Reason: ', value: `${args[1]}`},   
            )
            .setTimestamp();
            const restrictrole = message.guild.roles.cache.find(role => role.name === "Restricted");
            if(!restrictrole) return message.reply("I couldn't find the restricted role!");
        const channel = message.guild.channels.cache.find(channel => channel.name === "staff-logs")
        //If all steps are completed successfully try kick this user
         if(memberto.roles.cache.find(r => r.name === "Restricted")){
          return message.reply('This user is already restricted!')
        }
            memberto.roles.add(restrictrole,`Restricted by ${message.member.displayName} with the reason ${args[1]}.`)
            .then(() => console.log(`Restricted ${memberto.displayName} by ${message.member.displayName} for ${args[1]}.`))
            memberto.send(`You have been Restricted in ${message.channel.guild}. Reason: ${args[1]}.  To become unrestricted, please DM <@575252669443211264> and appeal.`)
            .catch(() => message.reply(`I cannot send a DM to ${memberto}.`));           
            message.channel.send(`Sucessfully Restricted ${memberto.displayName} for ${args[1]}.`)
            channel.send(exampleEmbed)
            .catch(console.error);     
    }
} 