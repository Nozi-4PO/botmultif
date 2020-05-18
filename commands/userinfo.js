const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

class Userinfo extends Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      description: 'Displays few information about the user.',
      usage: 'userinfo [mention]',
      aliases: ['userstats','uinfo'],
      botPermNeeded: ['EMBED_LINKS']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{
    let person;
    let nicktext = ""
    let gametext = ""
    let isbot = ""
    let rolestext = ""
    if (message.mentions.users.size === 0)    {
        person = message.author;
    } else {
         person = message.mentions.users.first();
    }
    
    const embed = new RichEmbed()
    .setAuthor(person.username, person.avatarURL)
    .setColor(0xb0c4de)
    .setThumbnail(person.avatarURL)
    .addField('Username', person.username, true)
    .addField('Discrim', `#**${person.discriminator}**`, true)
    if (message.channel.type !== "dm"){
        if (this.client.guilds.get(message.guild.id).members.get(person.id).nickname){
            nicktext = this.client.guilds.get(message.guild.id).members.get(person.id).nickname;
        } else nicktext = "-----"
        embed.addField('Nickname', nicktext, false)
    }
    embed.addField('Created', moment(person.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a'))
    if(message.channel.type !== "dm"){
        embed.addField('Joined', moment(this.client.guilds.get(message.guild.id).members.get(person.id).joinedAt).format('dddd, MMMM Do YYYY, h:mm:ss a'))
    }
    if(message.channel.type !== "dm"){
        rolestext = message.guild.members.get(person.id).roles.map(r => r.name.replace('@everyone', '**everyone**')).join(", ");
        embed.addField(`Roles [${message.guild.members.get(person.id).roles.array().length}]`, rolestext)
    }embed.addField('Status', this.client.capitalizeFirstLetter(person.presence.status),true)
    if(person.presence.game === null ){
        gametext = "-----"
    } else gametext = person.presence.game.name;
    embed.addField('Game', gametext, true)
    if(person.bot) isbot = "Yes"
    else isbot = "No"
    embed.addField('Bot',`${this.client.capitalizeFirstLetter(isbot)}`, true)
    embed.setTimestamp()
    .setFooter(this.client.user.username, this.client.user.avatarURL);
    message.channel.send({embed}).catch(e => console.error(e));

    } catch(error) {console.log(error)}
  }
}
module.exports = Userinfo;