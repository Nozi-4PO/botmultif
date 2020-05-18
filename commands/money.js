const Command = require('../base/Command.js');
const moment = require('moment');

class Money extends Command {
  constructor(client) {
    super(client, {
      name: 'money',
      description: 'Shows the money amount in the Bank.',
      usage: 'money',
      category: 'Fun'
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{//<:blueheart:360324887736221698>
        if(!this.client.coinsTableG[message.author.id]) return message.reply(`You dont have an account, Type \`${this.client.serverConfig[message.guild.id].prefix}register\` to open an account to keep your :dollar: safe.`)
        const amount = this.client.coinsTableG[message.author.id].coins;
        message.reply(`You have ${amount} :dollar:.`);
    } catch(error) {console.log(error)}
  }
}

module.exports = Money;
