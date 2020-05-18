const Command = require('../base/Command.js');

class AdCheck extends Command {
  constructor(client) {
    super(client, {
      name: 'adcheck',
      description: 'Returns a list of users with adverts',
      usage: 'adcheck',
      category:'Moderation',
      guildOnly: true,
      aliases: ['ads', 'checkads'],
      userPermNeeded: ['ADMINISTRATOR']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
    return message.channel.send(members.map(member => `$kick ${member} Discord invite link in \`Playing:\` field.`).join('\n') || 'No invite links found.');
  }
}

module.exports = AdCheck;