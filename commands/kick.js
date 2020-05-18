const Command = require('../base/Command.js');

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      description: 'Kicks a mentioned user, or a user\'s ID',
      usage: 'kick <mention> [reason]',
      aliases: ['toss', 'boot', 'throw'],
      category: "Moderation",
      guildOnly: true,
      botPermNeeded: ['KICK_MEMBERS'],
      userPermNeeded: ['KICK_MEMBERS']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars

    const target = message.mentions.members.first();
    if (target === message.author) return message.reply(':joy: You cant Kick Yourself :joy:');
    if (!target) return message.reply(':unamused: Invalid command usage, You must mention someone to use this command.');
    if (!target.kickable) return message.reply(`You cannot Kick **${target.username}**`);
    
    const reason = args.splice(1, args.length).join(' ');
    target.kick(reason);
    await message.channel.send('Kicked!');
  }
}

module.exports = Kick;