// const Discord = require('discord.js')

// const client=new Discord.Client();

const Discord=require('discord.js');
const client=new Discord.Client();

const prefix='-'

const mine=require('minecraft-server-util')

// const fs=require('fs')

// client.commands=new Discord.Collection()

// const commandFiles = fs.readdirSync('./commands/').filter(file =>file.endsWith('.js'))
// for(const file of commandFiles){
//     const command=require(`./commands/${file}`)
//     client.commands.set(command.name,command)
// }

client.once('ready',()=>{
    console.log('Pomana is online')
})

client.on('message',message=>{
    message.member.roles.cache.has
    if(!message.content.startsWith(prefix)||message.author.bot)return;

    const args =message.content.slice(prefix.length).split(/ +/);
    const command=args.shift().toLowerCase();
    // if(command ==='ping'){
    //     client.commands.get('ping').execute(message,args);
    // }
    // else if(command==='youtube'){
    //     client.commands.get('youtube').execute(message,args);
    // }
    if(command==='mc'){
        mine.status('play.hypixel.net')
            .then((response)=>{
                var Embed=new Discord.MessageEmbed()
                .setTitle('Server Status')
                .addField('Server IP',response.host)
                .addField('Server Version',response.version)
                .addField('Online Players',response.onlinePlayers)
                .addField('max Players',response.maxPlayers)
                message.channel.send(Embed)
                console.log(response);
            })
            .catch((error)=>{
                throw error;
            });
    }
});


client.login('token');

