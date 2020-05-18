const Command = require('../base/Command.js');


class setlog extends Command {
  constructor(client) {
    super(client, {
      name: 'setlog',
      description: "Edit the bot's prefix for this server.\n\t\t\t    The log channel will be the channel where this command is run.",
      usage: 'setlog <enable [log type(1-3)]> / <disable>',
      guildOnly: true,
      category: "Server",
      userPermNeeded: ['MANAGE_GUILD']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{
      if(!parseInt(args[1])) return message.reply('Choose between 1-3 for log message type. Join the official BigB server for more information about log-Types.')
      let logDo;
      let logType;
      if (!args[0]) return;
      if(args[0].toLowerCase() === "enable"){
        logDo = true;
        logType = args[1];
        if(logType > 3) logType = 3;
      }else if(args[0].toLowerCase() === "disable"){
        logDo = false;
        logType = 0;
      }else return;
      this.client.serverConfig[message.guild.id] = {          
        "servername" : message.guild.name,
        "prefix" : this.client.serverConfig[message.guild.id].prefix,
        "welcomeLog" : logDo,
        "logChannelId" : message.channel.id,
        "logType" : logType,
        "noUsageChannels" : this.client.serverConfig[message.guild.id].noUsageChannels,
        "blacklist" : this.client.serverConfig[message.guild.id].blacklist
      }
      this.client.databaseUpdate(this.client.serverData, this.client.serverConfig);
      message.channel.send(':thumbsup: Done').then(m => m.delete(3000));
    } catch(error) {console.log(error)}
  }
}

module.exports = setlog;