// const Discord = require('discord.js')

// const client=new Discord.Client();
const Discord=require('discord.js');
const client=new Discord.Client();

const prefix='.'

const mine=require('minecraft-server-util');
const meme=require('random-stuff-api');
const fetch=require('node-fetch');
const queryString=require('querystring');

const fs=require('fs')

client.commands=new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file =>file.endsWith('.js'))
for(const file of commandFiles){
    const command=require(`./commands/${file}`)
    client.commands.set(command.name,command)
}

client.once('ready',()=>{
    console.log('Pomana is online')
})
client.on('guildMemberAdd',member=>{
    member.send("Welcome to SWC Discord");
})

client.on('message',message=>{
    message.member.roles.cache.has
    if(!message.content.startsWith(prefix)||message.author.bot)return;

    const args =message.content.slice(prefix.length).split(/ +/);
    const command=args.shift().toLowerCase();
    if(command ==='ping'){
        client.commands.get('ping').execute(message,args);
    }
    
    else if(command==='mc'){
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
    else if(command==='mgr'){
        meme.random.insult()
        .then(insult=>{
            var Embed=new Discord.MessageEmbed()
            .setTitle('Meme')
            .setDescription(insult)
            message.channel.send(Embed)
            console.log(insult)
        })
    }
    else if(command==='mgi'){
        meme.image.meme()
        .then(meme=>{
            message.channel.send(meme)
            console.log(meme)
        })
    }
    else if(command==='cf'){
        if (!args.length) {
            return message.channel.send('You need to supply a search term!');
            }
            const query=queryString.stringify({handles:args.join(' ')});
            const {result} =await fetch(`https://codeforces.com/api/user.info?${query}`).then(response => response.json());
            // if (!result.length) {
            //     return message.channel.send(`No results found for **${args.join(' ')}**.`);
            // }
        //   const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
          //  console.log(result[n-1].contestId);
            var embed=new Discord.MessageEmbed()
            .setColor('#FF6347')
            .setTitle("User "+args)
            .setThumbnail("https:"+result[0].avatar)
            .addFields(
                {name:'Name',value:result[0].firstName+result[0].lastName},
                {name:'Rank',value:result[0].rank},
                {name:'Rating',value:result[0].rating},

            );
            message.channel.send(embed);
            
        }
    
});


client.login('token');

