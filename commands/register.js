const Command = require('../base/Command.js');
const moment = require('moment');

class Register extends Command {
  constructor(client) {
    super(client, {
      name: 'register',
      description: 'Register bank account for the usage of fun commands.',
      usage: 'register',
      category: 'Fun'
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{//<:blueheart:360324887736221698>
      if(this.client.coinsTableG[message.author.id]) return message.reply('You already have your bank account.') 
      this.client.coinsTableG[message.author.id] = {
        "coins" : 50,
        "timeLeft" : 0
      }
      this.client.databaseUpdate(this.client.coinsGlobal, this.client.coinsTableG)
      message.channel.send('Congrats your bank account has been created with 50 :dollar:.')
    } catch(error) {console.log(error)}
  }
}

module.exports = Register;
