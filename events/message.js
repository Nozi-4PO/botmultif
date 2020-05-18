module.exports = class {
    constructor(client) {
        this.client = client;
    }

  async execute(message) {
    try{
    // checking if the message is sent by bot
    if (message.author.bot) return;

    // checking if the server has the setting in database or not
    if(!this.client.serverConfig[message.guild.id]) {
      this.client.serverConfig[message.guild.id] = {          
        "servername" : message.guild.name,
        "prefix" : "!",
        "welcomeLog" : false,
        "logChannelId" : "",
        "logType" : 0,
        "noUsageChannels" : "",
        "blacklist" : ""
        }
      this.client.databaseUpdate(this.client.serverData, this.client.serverConfig);
    }
    // calculating level of the user
    const level = this.client.permLvlCheck(message);

    // checking for direct bot mention
    if (message.content.match(new RegExp(`^<@!?${this.client.user.id}>$`))) {
        let mentionMsg = '';
        mentionMsg = `The prefix here is \`${this.client.serverConfig[message.guild.id].prefix}\`.`;
        if(this.client.serverConfig[message.guild.id].prefix !== this.client.config.prefix){
            mentionMsg += `\nAlso the prefix I accept everywhere i.e. even in DM is \`${this.client.config.prefix}\`.`
        }
        return message.channel.send(mentionMsg);
    }

    //getting the prefix
    var prefixes = '';
    let prefix = false;
    if(message.channel.type === "dm"){
        prefix = this.client.config.prefix;
    }
    else {
        prefixes = [this.client.config.prefix, this.client.serverConfig[message.guild.id].prefix];
        for(const thisPrefix of prefixes) {
            if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }
    }
    if(!prefix) return;
    if(!message.content.startsWith(prefix)) return;

    // checking if the channel from where command is accessed, it is in the no-usage channel or not
    if(message.guild){
        const noUsageList = this.client.serverConfig[message.guild.id].noUsageChannels;
        if(noUsageList.includes(message.channel.id)) return;
    }


    // checking if the user is globally blacklisted by the bot owner
    const list = this.client.blackListTable.list;
        if(list.includes(message.author.id)) return message.author.send('You have been blacklisted to use my commands anywhere within discord!')
    
    // checking if the user is blacklisted to use any of the bot commands in the server
    if (message.guild) {
        const blacklist = this.client.serverConfig[message.guild.id].blacklist;
        if(blacklist.includes(message.author.id)) return message.reply('You have been blacklisted in this server to use any of my commands!');
    }  

    // command cooldown to be done 

    // running the command by checking the permissions and other things as well
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    if (cmd && !message.guild && cmd.conf.guildOnly)
        return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');
    if (cmd && level >= cmd.conf.permLevel) {
        // checking if guild or DM and checking if has perms
        if(message.guild){
            if(!message.member.hasPermission(cmd.conf.userPermNeeded, false, true)) return;
        }
        message.flags = [];
        while (args[0] && args[0][0] === '-') {
            message.flags.push(args.shift().slice(1));
        }
        this.client.log('log', `${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, 'CMD');

        //checking if bot has the needed permissions or not
        if (message.channel.type === 'text') { 
            const mPerms = message.guild.member(this.client.user).hasPermission(cmd.conf.botPermNeeded);
            if (!mPerms) return message.channel.send(`The bot does not have the required permissions to run this command`);
        }

        cmd.run(message, args, level).catch(error => {
            message.channel.send(error);
        });
    }
   } catch(error) {console.log(error)}
  }
}