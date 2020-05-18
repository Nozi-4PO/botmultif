const Command = require('../base/Command.js');


class setPrefix extends Command {
  constructor(client) {
    super(client, {
      name: 'setPrefix',
      description: "Edit the bot's prefix for this server",
      usage: 'setPrefix <prefix>',
      guildOnly: true,
      category: "Server",
      userPermNeeded: ['MANAGE_GUILD']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{
      if (!args[0]) return;
      this.client.serverConfig[message.guild.id] = {          
        "servername" : message.guild.name,
        "prefix" : args[0],
        "welcomeLog" : this.client.serverConfig[message.guild.id].welcomeLog,
        "logChannelId" : this.client.serverConfig[message.guild.id].logChannelId,
        "logType" : this.client.serverConfig[message.guild.id].logType,
        "noUsageChannels" : this.client.serverConfig[message.guild.id].noUsageChannels,
        "blacklist" : this.client.serverConfig[message.guild.id].blacklist
      }
      this.client.databaseUpdate(this.client.serverData, this.client.serverConfig);
      message.reply(`The prefix has been changed to \`${args[0]}\``)
    } catch(error) {console.log(error)}
  }
}

module.exports = setPrefix;