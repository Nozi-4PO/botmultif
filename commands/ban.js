const Command = require('../base/Command.js');

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      description: 'Bans a mentioned user',
      usage: 'ban <mention> [reason]',
      aliases: ['banne', 'bean'],
      guildOnly: true,
      category: "Moderation",
      botPermNeeded: ['BAN_MEMBERS'],
      userPermNeeded: ['BAN_MEMBERS']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    let member = message.mentions.members.first();
    if (!member) return message.reply('Invalid command usage, You must mention someone to use this command.');
    if (!member.bannable) return message.channel.send(`:unamused: You cant ban **${member.user.username}**`);

    let reasonb = args.slice(1).join(" ");
    member.ban({days : 7, reason : reasonb});
    // await this.buildModLog(this.client, message, 'b');
    await message.channel.send('beaned!');
  }
}

module.exports = Ban;