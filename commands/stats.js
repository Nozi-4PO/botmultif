const Command = require('../base/Command.js');
const { version } = require('discord.js');
const { RichEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class Stats extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      description: 'Gives some useful bot statistics',
      usage: 'stats',
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const duration = moment.duration(this.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    const embed = new RichEmbed()
    .setColor(0xd2691e)
    .setThumbnail(this.client.user.avatarURL)
    .addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
    .addField('Uptime', duration, false)
    .addField('Users', this.client.users.size.toLocaleString())
    .addField('Servers', this.client.guilds.size.toLocaleString(), true)
    .addField('Channels', this.client.channels.size.toLocaleString(), true)    
    .addField('Discord.js', `v${version}`, true)
    .addField('Node', process.version, true)
    .addField('Source', `**Click [Here](https://github.com/Innovative-creators/BigB) to see the source code**`)
    message.channel.send({embed}).catch(e => console.error(e));
  }
}

module.exports = Stats;
