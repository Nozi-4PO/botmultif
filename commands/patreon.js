const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');

class Patreon extends Command {
  constructor(client) {
    super(client, {
      name: 'patreon',
      description: 'Displays patreon information',
      usage: 'patreon',
      category: 'Support',
      aliases: ['donate', 'pledge', 'patron']
    });
  }

  async run(message, args, level) {
      const embed = new RichEmbed()
      .setColor(0xff5900)
      .addField('Disclaimer', 'Support the bot-owner for the creation of the bot itself by donating a small amount you have.')
      .addField('Become a Patron', 'The cheapest support and special role in the official server of the bot and love.\n**Click [here](https://www.patreon.com/bePatron?c=110057&rid=2004589) to pledge $1.00**\n')
      .addField('Supporter', 'A better support for developement of **__BigB__** bot with a special role in the server and lots of love.\n**Click [here](https://www.patreon.com/bePatron?c=110057&rid=2004573) to pledge $5.00**\n')
      message.channel.send({embed});
    }
}
module.exports = Patreon;