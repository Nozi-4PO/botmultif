const Command = require('../base/Command.js');

class Roll extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      description: 'Rolls a dice.',
      usage: 'roll',
      category:'Fun',
      aliases: ['dice']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    let rolled = Math.floor(Math.random()*6);
    while (rolled === 0){
      rolled = Math.floor(Math.random()*6);
    }
    message.channel.send(`**${message.author.username}**, You rolled ${rolled} :game_die:`);
  }
}
module.exports = Roll;