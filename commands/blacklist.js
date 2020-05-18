const Command = require('../base/Command.js');

class Blacklist extends Command {
  constructor(client) {
    super(client, {
      name: 'blacklist',
      description: "Blacklist any user from using the bots command in this server",
      usage: 'sprefix <prefix>',
      guildOnly: true,
      category: "Server",
      aliases: ['setprefix'],
      userPermNeeded: ['MANAGE_GUILD']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{
      if (!args[0]) return;
      let enord = args[0].toLowerCase();
      if(enord === "add"){
        const target = message.mentions.members.first();
        if (target === message.author) return message.reply('You cant blacklist Yourself!');
        if (!target) return message.reply(':unamused: Invalid command usage, You must mention someone to use this command.');
        if(this.client.serverConfig[message.guild.id].blacklist.includes(target.id)) return message.reply('This user is already blacklisted');
        if(message.guild.member(target.user).hasPermission('MANAGE_GUILD')) return message.reply('You cant blacklist a person with `Manage Server` Permission.')
        this.client.serverConfig[message.guild.id] = {          
            "servername" : message.guild.name,
            "prefix" : this.client.serverConfig[message.guild.id].prefix,
            "welcomeLog" : this.client.serverConfig[message.guild.id].welcomeLog,
            "logChannelId" : this.client.serverConfig[message.guild.id].logChannelId,
            "logType" : this.client.serverConfig[message.guild.id].logType,
            "noUsageChannels" : this.client.serverConfig[message.guild.id].noUsageChannels,
            "blacklist" : this.client.serverConfig[message.guild.id].blacklist + ", " +target.id
        }
        message.reply(`**${target.user.username}** has been added to the blacklist`);
      } else if(enord === "remove"){
        const target = message.mentions.members.first();
        if (!target) return message.reply(':unamused: Invalid command usage, You must mention someone to use this command.');
        if(!this.client.serverConfig[message.guild.id].blacklist.includes(target.id)) return message.reply('This user is not in the blacklist');
        this.client.serverConfig[message.guild.id] = {          
            "servername" : message.guild.name,
            "prefix" : this.client.serverConfig[message.guild.id].prefix,
            "welcomeLog" : this.client.serverConfig[message.guild.id].welcomeLog,
            "logChannelId" : this.client.serverConfig[message.guild.id].logChannelId,
            "logType" : this.client.serverConfig[message.guild.id].logType,
            "noUsageChannels" : this.client.serverConfig[message.guild.id].noUsageChannels,
            "blacklist" : this.client.serverConfig[message.guild.id].blacklist.replace(target.id, "")
        }
        message.reply(`**${target.user.username}** has been removed from the blacklist`);
      }
      
      this.client.databaseUpdate(this.client.serverData, this.client.serverConfig);
    } catch(error) {console.log(error)}
  }
}

module.exports = Blacklist;