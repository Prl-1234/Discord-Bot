module.exports={
    name:'youtube',
    description:'this is youtube link command ',
    execute(message,args){
        if(message.member.roles.cache.has('762982668848726036')){
            message.channel.send('https://youtube.com');
        }
        else{
            message.channel.send('No permission to send this message');
        }
    }
}