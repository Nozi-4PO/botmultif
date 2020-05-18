const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

class ServerInfo extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      description: 'Displays server information & statistics.',
      usage: 'serverinfo',
      guildOnly: true,
      category: "Server",
      aliases: ['serverstats','guildinfo','guildstats','sinfo']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{
      let verificationLevelTxt;
      switch (message.guild.verificationLevel){
          case 0:
          verificationLevelTxt = "None"
          break;
          case 1:
          verificationLevelTxt = "Must have verified email on the discord account."
          break;
          case 2:
          verificationLevelTxt = "Must be registered on discord for longer than 5 mins."
          break;
          case 3:
          verificationLevelTxt = "Must be member of this server for longer than 10 mins."
          break;
          case 4:
          verificationLevelTxt = "Must have a phone verified on their discord account."
      }

    const embed = new RichEmbed()
      .setAuthor(message.guild.name)
      .setColor(3447003)
      .setThumbnail(message.guild.iconURL)
      .setDescription(`Owner\t\t: ${message.guild.owner.user.tag}\nOwner ID   : ${message.guild.owner.id}`)
      .addField('Server ID', message.guild.id, true)
      .addField('Region', this.client.capitalizeFirstLetter(message.guild.region), true)
      .addField('Member Count',  `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} Users  |  ${message.guild.members.filter(m=>m.user.bot).size} Bots`, true)
      .addField('Members Online',` ${message.guild.members.filter(m => (m.user.presence.status === "online" )).size} online  | ${message.guild.members.filter(m => (m.user.presence.status === "dnd" )).size} Dnd  | ${message.guild.members.filter(m => (m.user.presence.status === "idle" )).size} Idle`, true)
      .addField('Channels', `${message.guild.channels.size} Total\n${message.guild.channels.filter(c => c.type === "text").size} Text  |  ${message.guild.channels.filter(c => c.type === "voice").size} voice`, false)
      .addField('Roles', message.guild.roles.size, true)
      .addField('Verification Level', 'In order for new members to send message in this server they must have the level:\n' +message.guild.verificationLevel + ' - __' + verificationLevelTxt + '__')
      .addField('Created', moment(message.guild.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a'), false)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL);
    message.channel.send({embed}).catch(e => console.error(e));
    } catch (error) {console.log(error)}
  }
}

module.exports = ServerInfo;