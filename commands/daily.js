const Command = require('../base/Command.js');
const moment = require('moment');

class Daily extends Command {
  constructor(client) {
    super(client, {
      name: 'daily',
      description: 'Gives daily $50.',
      usage: 'daily',
      category: 'Fun'
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try{//<:blueheart:360324887736221698>
      if(!this.client.coinsTableG[message.author.id]) return message.reply(`You dont have an account, Type \`${this.client.serverConfig[message.guild.id].prefix}register\` to open an account to keep your :dollar: safe.`)
      const timeToCheck = this.client.coinsTableG[message.author.id].timeLeft;

      if(Date.now() > timeToCheck){
        const msg = await message.channel.send(`You have claimed your daily :dollar:, Ain't that dandy?`);
        this.client.coinsTableG[message.author.id] = {
            "coins" : this.client.coinsTableG[message.author.id].coins + 50,
            "timeLeft" : msg.createdTimestamp + ( 24 * 60 * 60 * 1000)
        }
        this.client.databaseUpdate(this.client.coinsGlobal, this.client.coinsTableG)
      } else {
        const fromNow = moment(timeToCheck).fromNow(true);
        message.channel.send(`You cannot claim your daily reward yet, please try again in ${fromNow}.`);
      }
    } catch(error) {console.log(error)}
  }
}

module.exports = Daily;
