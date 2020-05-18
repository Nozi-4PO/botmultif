const Command = require('../base/Command.js');
const { RichEmbed } = require('discord.js');

class Info extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      description: 'Shows important info about bot.',
      usage: 'info',
      category: "Support",
      aliases: ['botinfo']
    });
  }

  async run(message, args, level) {
    const embed = new RichEmbed()
    .setAuthor(this.client.user.username, this.client.user.avatarURL)
    .addField('Bot Invite', `Do you want to invite this bot to your server? Use this link:\nhttps://discordapp.com/oauth2/authorize?client_id=358103340686770176&scope=bot&permissions=2146958591`)
    .addField('Server Invite', `Did you find any flaw in the bot, or do you want to suggest something ?\nJoin the official server of the bot and have your talking there.\nhttps://discord.gg/YMktFmw`)
    .addField('Important note', 'As this bot is being hosted on HEROKU, it has few limitations. Somehow I (Bot owner) have succeded in overcoming one of its limit but it still has limit. Hope that wont trouble you. But if its troubling you, you can inform by getting in the server of the bot. We (Bot makers)are eager to hear from you.')
    .addField('How does it work ???', 'The bot works by checking your permission on a server and list the help command accordingly. Also you can use the bot in DM.')
    message.channel.send({embed}).catch(e => console.error(e));
  }
}
module.exports = Info;