const Command = require('../base/Command.js');

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      description: 'Displays the avatar of the user.',
      usage: 'avatar'
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    message.channel.send(message.author.avatarURL)
  }
}
module.exports = Avatar;