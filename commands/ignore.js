const Command = require('../base/Command.js');

class Ignore extends Command {
  constructor(client) {
    super(client, {
      name: 'ignore',
      description: "Add\Remove this channel to bot ignore list",
      usage: 'ignore',
      guildOnly: true,
      category: "Server",
      aliases: ['channelignore'],
      userPermNeeded: ['MANAGE_GUILD']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
      return message.channel.send('Sorry this command is not working as intended as of now, so it will not work.')
      await message.channel.send('This command is incomplete as of now, so if you ignore this channel you wont be able to remove it from the list. So if you are sure you want to use this, use if after this message.')
    try{
      let list = this.client.serverConfig[message.guild.id].noUsageChannels;
      let outputMsg;
      if (list.includes(message.channel.id)){
          list.replace(message.channel.id, '');
          outputMsg = `**${message.channel.id}** has been removed from the ignore list, I will respond to any command call from this channel now.`
      } else{
          list = list + ", " + message.channel.id;
          outputMsg = `**${message.channel.id}** has been added to the ignore list, I wont respond to any command call from this channel now.`
      }
      this.client.serverConfig[message.guild.id] = {          
            "servername" : message.guild.name,
            "prefix" : this.client.serverConfig[message.guild.id].prefix,
            "welcomeLog" : this.client.serverConfig[message.guild.id].welcomeLog,
            "logChannelId" : this.client.serverConfig[message.guild.id].logChannelId,
            "logType" : this.client.serverConfig[message.guild.id].logType,
            "noUsageChannels" : list,
            "blacklist" : this.client.serverConfig[message.guild.id].blacklist
        }
        this.client.databaseUpdate(this.client.serverData, this.client.serverConfig);
        message.channel.send(outputMsg);
    } catch(error) {console.log(error)}
  }
}

module.exports = Ignore;